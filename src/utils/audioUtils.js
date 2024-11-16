import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg = null;

export const isCompressionNeeded = (file) => {
  const MAX_SIZE = 24 * 1024 * 1024; // 24MB to give some buffer
  return file.size > MAX_SIZE;
};

export const compressAudioFile = async (file, onProgress) => {
  try {
    if (!ffmpeg) {
      onProgress(5);
      ffmpeg = new FFmpeg();
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    }

    onProgress(10);
    const inputData = await fetchFile(file);
    const inputFileName = 'input' + file.name.substring(file.name.lastIndexOf('.'));
    const preprocessedFileName = 'preprocessed.wav';
    const outputFileName = 'output.mp3';

    onProgress(20);
    await ffmpeg.writeFile(inputFileName, inputData);

    // Step 1: Initial conversion and preprocessing
    onProgress(30);
    await ffmpeg.exec([
      '-i', inputFileName,
      '-ac', '1',                // Convert to mono
      '-ar', '16000',           // Sample rate optimal for speech
      '-af', 'silenceremove=stop_periods=-1:stop_duration=1:stop_threshold=-50dB', // Remove silences
      preprocessedFileName
    ]);

    // Step 2: Advanced audio processing and compression
    onProgress(50);
    await ffmpeg.exec([
      '-i', preprocessedFileName,
      '-af', 'highpass=f=100,lowpass=f=8000,volume=1.5,compand=0.3|0.3:1|1:-90/-60|-60/-40|-40/-30|-20/-20:6:0:-90:0.2',
      '-c:a', 'libmp3lame',     // Use MP3 encoder
      '-b:a', '24k',            // Ultra-low bitrate, sufficient for speech
      '-compression_level', '9', // Maximum compression
      '-map_metadata', '-1',    // Strip metadata
      outputFileName
    ]);

    onProgress(80);
    const data = await ffmpeg.readFile(outputFileName);
    const blob = new Blob([data], { type: 'audio/mp3' });
    const compressedFile = new File([blob], 'compressed.mp3', { type: 'audio/mp3' });

    // Verify the size is under limit
    const MAX_SIZE = 24 * 1024 * 1024; // 24MB
    if (compressedFile.size > MAX_SIZE) {
      // If still too large, try one more time with even more aggressive settings
      onProgress(85);
      await ffmpeg.exec([
        '-i', outputFileName,
        '-ac', '1',
        '-ar', '8000',           // Further reduce sample rate
        '-b:a', '16k',           // Ultra-low bitrate
        '-af', 'highpass=f=200,lowpass=f=3400,volume=1.5', // More aggressive filtering
        'final_output.mp3'
      ]);
      
      const finalData = await ffmpeg.readFile('final_output.mp3');
      const finalBlob = new Blob([finalData], { type: 'audio/mp3' });
      const finalFile = new File([finalBlob], 'compressed.mp3', { type: 'audio/mp3' });
      
      if (finalFile.size > MAX_SIZE) {
        throw new Error(`File still too large (${(finalFile.size / (1024 * 1024)).toFixed(2)}MB) after maximum compression.`);
      }
      
      onProgress(100);
      return finalFile;
    }

    onProgress(100);
    return compressedFile;
  } catch (error) {
    console.error('Error in compressAudioFile:', error);
    throw error;
  }
};

export const validateAudioFile = (file) => {
  const MAX_SIZE = 24 * 1024 * 1024; // 24MB in bytes
  const SUPPORTED_TYPES = [
    'audio/mp3',
    'audio/mp4',
    'audio/mpeg',
    'audio/mpga',
    'audio/m4a',
    'audio/wav',
    'audio/webm'
  ];

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      message: 'File size exceeds 24MB limit. The file will be compressed.'
    };
  }

  if (!SUPPORTED_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: 'Unsupported file type. Please use mp3, mp4, m4a, wav, or webm.'
    };
  }

  return { valid: true };
};
