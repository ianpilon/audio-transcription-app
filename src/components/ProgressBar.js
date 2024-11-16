import React from 'react';

const ProgressBar = ({ progress }) => {
  const displayProgress = Math.min(Math.max(Math.round(progress), 0), 100);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill active"
          style={{ width: `${displayProgress}%` }}
        >
          <div className="progress-animated"></div>
        </div>
      </div>
      <p className="progress-text">{displayProgress}% Processing</p>
    </div>
  );
};

export default ProgressBar;