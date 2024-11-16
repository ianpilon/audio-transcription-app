import React from 'react';
import { useTranscription } from './context/TranscriptionContext';
import FileUpload from './components/FileUpload';
import TranscriptionResult from './components/TranscriptionResult';
import ProgressBar from './components/ProgressBar';
import ApiKeyInput from './components/ApiKeyInput';
import './App.css';

function App() {
  const { transcription, isTranscribing, progress } = useTranscription();

  return (
    <div className="app-container">
      <h1 className="app-title">The Demand Validation Analyzer</h1>
      <ApiKeyInput />
      {!transcription && <FileUpload />}
      {isTranscribing && <ProgressBar progress={progress} />}
      {transcription && <TranscriptionResult />}
    </div>
  );
}

export default App;
