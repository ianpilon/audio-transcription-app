import React, { useState } from 'react';
import { useTranscription } from '../context/TranscriptionContext';

const ApiKeyInput = () => {
  const { apiKey, updateApiKey } = useTranscription();
  const [inputValue, setInputValue] = useState(apiKey);

  const handleSave = () => {
    updateApiKey(inputValue);
  };

  const handleDelete = () => {
    updateApiKey('');
    setInputValue('');
  };

  return (
    <div className="api-key-container">
      <input
        type="password"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your API key"
        className="api-key-input"
        disabled={apiKey}
      />
      {apiKey ? (
        <button onClick={handleDelete} className="delete-key-button">
          Delete Key
        </button>
      ) : (
        <button onClick={handleSave} className="save-key-button">
          Save Key
        </button>
      )}
    </div>
  );
};

export default ApiKeyInput;
