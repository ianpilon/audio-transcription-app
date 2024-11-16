import React, { useRef, useState } from 'react';
import { useTranscription } from '../context/TranscriptionContext';
import { compressAudioFile, isCompressionNeeded } from '../utils/audioUtils';
import ProgressBar from './ProgressBar';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const fileInputRef = useRef(null);
  const {
    startTranscription,
    isTranscribing,
    transcriptionError
  } = useTranscription();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      await processFile(file);
    } else {
      console.error('Invalid file type. Please upload an audio file.');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Add detailed logging
    console.log('Original file:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    });

    await processFile(file);
  };

  const processFile = async (file) => {
    console.log('Starting file processing');
    let processedFile = file;

    if (isCompressionNeeded(file)) {
      console.log('Compression needed - file exceeds 25MB');
      try {
        setIsCompressing(true);
        setCompressionProgress(0);
        processedFile = await compressAudioFile(file, (progress) => {
          console.log(`Compression progress: ${progress}%`);
          setCompressionProgress(progress);
        });

        console.log('Compression complete:', {
          name: processedFile.name,
          type: processedFile.type,
          size: `${(processedFile.size / (1024 * 1024)).toFixed(2)} MB`
        });
      } catch (error) {
        console.error('Compression error:', error);
      } finally {
        setIsCompressing(false);
      }
    }

    setSelectedFile(processedFile);
  };

  const handleStartTranscription = async () => {
    if (selectedFile) {
      try {
        await startTranscription(selectedFile);
      } catch (error) {
        console.error('Error in handleStartTranscription:', error);
      }
    }
  };

  return (
    <div
      className={`file-upload ${isDragging ? 'drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag & drop your audio file here or click to select</p>

      {!selectedFile && (
        <button
          className="select-file-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Select File
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="audio/*"
        style={{ display: 'none' }}
      />

      {isCompressing && (
        <div className="compression-status">
          <p className="compression-notice">
            Optimizing audio file for transcription...
          </p>
          <ProgressBar progress={compressionProgress} />
        </div>
      )}

      {selectedFile && !isCompressing && (
        <>
          <p className="file-name">{selectedFile.name}</p>
          <button
            className="start-transcription-btn"
            onClick={handleStartTranscription}
            disabled={isTranscribing}
          >
            {isTranscribing ? 'Transcribing...' : 'Start Transcription'}
          </button>
        </>
      )}

      {transcriptionError && (
        <p className="error-message">{transcriptionError}</p>
      )}
    </div>
  );
};

export default FileUpload;
