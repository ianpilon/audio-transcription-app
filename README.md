# Audio Transcription App

A React-based web application for transcribing audio files with automatic optimization and OpenAI's Whisper model.

## Features

- Drag-and-drop audio file upload
- Automatic audio optimization for optimal transcription
- Support for multiple audio formats (mp3, mp4, mpeg, mpga, m4a, wav, webm)
- Real-time progress tracking
- Clean, modern user interface
- OpenAI Whisper integration for accurate transcription

## Technical Features

- Intelligent audio compression with FFmpeg
- Speech-optimized processing pipeline
- Automatic silence removal
- Dynamic bitrate adjustment
- Multi-stage compression for large files
- Frequency filtering optimized for speech

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ianpilon/audio-transcription-app.git
cd audio-transcription-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. Enter your OpenAI API key in the input field
2. Drag and drop an audio file or click to select one
3. Wait for the optimization process (if needed)
4. Click "Start Transcription"
5. View your transcription results

## Technologies Used

- React.js
- OpenAI Whisper API
- FFmpeg for audio processing
- WebAssembly for client-side audio manipulation

## Development

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## License

MIT License - feel free to use and modify for your own projects!
