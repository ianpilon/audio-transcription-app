import React from 'react';
import { useTranscription } from '../context/TranscriptionContext';
import ProgressBar from './ProgressBar';

function TranscriptionResult() {
  const { 
    transcription, 
    chunks, 
    isChunking, 
    chunkingError, 
    startChunking,
    isPIIScrubbing,
    piiScrubbingError,
    startPIIScrubbing,
    scrubbedTranscript,
    isTranscribing,
    transcriptionProgress,
    chunkingProgress,
    piiScrubbingProgress,
    isJTBDAnalyzing,
    jtbdAnalysisError,
    startJTBDAnalysis,
    jtbdAnalysisProgress,
    jtbdAnalysisResult,
    isJTBDGainsFinding,
    jtbdGainsError,
    startJTBDGainsFind,
    jtbdGainsProgress,
    jtbdGainsResult,
    isJTBDPainsFinding,
    jtbdPainsError,
    startJTBDPainsFind,
    jtbdPainsProgress,
    jtbdPainsResult,
    isJTBDSummarizing,
    jtbdSummaryError,
    startJTBDSummary,
    jtbdSummaryProgress,
    jtbdSummaryResult,
    isFrictionAnalyzing,
    frictionAnalysisError,
    startFrictionAnalysis,
    frictionAnalysisProgress,
    frictionAnalysisResult,
    isCURSEAnalyzing,
    curseAnalysisError,
    startCURSEAnalysis,
    curseAnalysisProgress,
    curseAnalysisResult,
    isCustomerProblemFitScoring,
    customerProblemFitError,
    startCustomerProblemFitScore,
    customerProblemFitProgress,
    customerProblemFitResult,
    isFinalReportGenerating,
    finalReportError,
    startFinalReportGeneration,
    finalReportProgress,
    finalReportResult,
    downloadExecutiveReport
  } = useTranscription();

  if (!transcription) {
    return null;
  }

  return (
    <div className="transcription-result">
      <h2>Transcription Result:</h2>
      <p>{transcription}</p>
      {isTranscribing && <ProgressBar progress={transcriptionProgress} />}
      <div className="chunking-section">
        <div className="action-buttons">
          <button 
            className="chunking-agent-button"
            onClick={startChunking}
            disabled={isChunking || chunks}
          >
            {isChunking ? 'Running Chunking Agent...' : 'Run Chunking Agent'}
          </button>
        </div>
        {chunkingError && <div className="error-message">{chunkingError}</div>}
        {isChunking && <ProgressBar progress={chunkingProgress} />}
      </div>
      {chunks && (
        <div className="chunks-result">
          <h3>Chunked Transcript:</h3>
          {chunks.map((chunk, index) => (
            <div key={index} className="chunk">
              <h4>Chunk {chunk.number}</h4>
              <p><strong>Theme:</strong> {chunk.theme}</p>
              <p><strong>Reason:</strong> {chunk.reason}</p>
              <p><strong>Text:</strong> {chunk.text}</p>
            </div>
          ))}
          {!scrubbedTranscript && (
            <div className="pii-scrubbing-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startPIIScrubbing}
                  disabled={isPIIScrubbing}
                >
                  {isPIIScrubbing ? 'Running PII Scrubber...' : 'Run PII Scrubber'}
                </button>
              </div>
              {piiScrubbingError && <div className="error-message">{piiScrubbingError}</div>}
              {isPIIScrubbing && <ProgressBar progress={piiScrubbingProgress} />}
            </div>
          )}
        </div>
      )}
      {scrubbedTranscript && (
        <div className="scrubbed-result">
          <h3>PII Scrubbed Transcript:</h3>
          <p>{scrubbedTranscript}</p>
          {!jtbdAnalysisResult && (
            <div className="jtbd-analysis-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startJTBDAnalysis}
                  disabled={isJTBDAnalyzing}
                >
                  {isJTBDAnalyzing ? 'Running JTBD Analysis...' : 'Run JTBD Analysis'}
                </button>
              </div>
              {jtbdAnalysisError && <div className="error-message">{jtbdAnalysisError}</div>}
              {isJTBDAnalyzing && <ProgressBar progress={jtbdAnalysisProgress} />}
            </div>
          )}
        </div>
      )}
      {jtbdAnalysisResult && (
        <div className="jtbd-analysis-result">
          <h3>JTBD Analysis Result:</h3>
          <p>{jtbdAnalysisResult}</p>
          {!jtbdGainsResult && (
            <div className="jtbd-gains-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startJTBDGainsFind}
                  disabled={isJTBDGainsFinding}
                >
                  {isJTBDGainsFinding ? 'Finding JTBD Gains...' : 'Find JTBD Gains'}
                </button>
              </div>
              {jtbdGainsError && <div className="error-message">{jtbdGainsError}</div>}
              {isJTBDGainsFinding && <ProgressBar progress={jtbdGainsProgress} />}
            </div>
          )}
        </div>
      )}
      {jtbdGainsResult && (
        <div className="jtbd-gains-result">
          <h3>JTBD Gains:</h3>
          <p>{jtbdGainsResult}</p>
          {!jtbdPainsResult && (
            <div className="jtbd-pains-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startJTBDPainsFind}
                  disabled={isJTBDPainsFinding}
                >
                  {isJTBDPainsFinding ? 'Finding JTBD Pains...' : 'Find JTBD Pains'}
                </button>
              </div>
              {jtbdPainsError && <div className="error-message">{jtbdPainsError}</div>}
              {isJTBDPainsFinding && <ProgressBar progress={jtbdPainsProgress} />}
            </div>
          )}
        </div>
      )}
      {jtbdPainsResult && (
        <div className="jtbd-pains-result">
          <h3>JTBD Pains:</h3>
          <p>{jtbdPainsResult}</p>
          {!jtbdSummaryResult && (
            <div className="jtbd-summary-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startJTBDSummary}
                  disabled={isJTBDSummarizing}
                >
                  {isJTBDSummarizing ? 'Generating JTBD Summary...' : 'JTBD Summary Agent'}
                </button>
              </div>
              {jtbdSummaryError && <div className="error-message">{jtbdSummaryError}</div>}
              {isJTBDSummarizing && <ProgressBar progress={jtbdSummaryProgress} />}
            </div>
          )}
        </div>
      )}
      {jtbdSummaryResult && (
        <div className="jtbd-summary-result">
          <h3>JTBD Summary:</h3>
          <p>{jtbdSummaryResult}</p>
          {!frictionAnalysisResult && (
            <div className="friction-analysis-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startFrictionAnalysis}
                  disabled={isFrictionAnalyzing}
                >
                  {isFrictionAnalyzing ? 'Analyzing Frictions...' : 'Frictions Preventing Progress Analysis'}
                </button>
              </div>
              {frictionAnalysisError && <div className="error-message">{frictionAnalysisError}</div>}
              {isFrictionAnalyzing && <ProgressBar progress={frictionAnalysisProgress} />}
            </div>
          )}
        </div>
      )}
      {frictionAnalysisResult && (
        <div className="friction-analysis-result">
          <h3>Frictions Preventing Progress:</h3>
          <p>{frictionAnalysisResult}</p>
          {!curseAnalysisResult && (
            <div className="curse-analysis-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startCURSEAnalysis}
                  disabled={isCURSEAnalyzing}
                >
                  {isCURSEAnalyzing ? 'Running CURSE Analysis...' : 'Run CURSE Problem Analysis'}
                </button>
              </div>
              {curseAnalysisError && <div className="error-message">{curseAnalysisError}</div>}
              {isCURSEAnalyzing && <ProgressBar progress={curseAnalysisProgress} />}
            </div>
          )}
        </div>
      )}
      {curseAnalysisResult && (
        <div className="curse-analysis-result">
          <h3>CURSE Problem Analysis:</h3>
          <p>{curseAnalysisResult}</p>
          {!customerProblemFitResult && (
            <div className="customer-problem-fit-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startCustomerProblemFitScore}
                  disabled={isCustomerProblemFitScoring}
                >
                  {isCustomerProblemFitScoring ? 'Calculating Score...' : 'Run Customer-Problem Fit Score'}
                </button>
              </div>
              {customerProblemFitError && <div className="error-message">{customerProblemFitError}</div>}
              {isCustomerProblemFitScoring && <ProgressBar progress={customerProblemFitProgress} />}
            </div>
          )}
        </div>
      )}
      {customerProblemFitResult && (
        <div className="customer-problem-fit-result">
          <h3>Customer-Problem Fit Score:</h3>
          <p>{customerProblemFitResult}</p>
          {!finalReportResult && (
            <div className="final-report-section">
              <div className="action-buttons">
                <button 
                  className="chunking-agent-button"
                  onClick={startFinalReportGeneration}
                  disabled={isFinalReportGenerating}
                >
                  {isFinalReportGenerating ? 'Generating Final Report...' : 'Run Final Research Analysis Report'}
                </button>
              </div>
              {finalReportError && <div className="error-message">{finalReportError}</div>}
              {isFinalReportGenerating && <ProgressBar progress={finalReportProgress} />}
            </div>
          )}
        </div>
      )}
      {finalReportResult && (
        <div className="final-report-result">
          <h3>Final Research Analysis Report:</h3>
          <p>{finalReportResult}</p>
          <button 
            className="download-button"
            onClick={downloadExecutiveReport}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '20px'
            }}
          >
            Download Executive Report
          </button>
        </div>
      )}
    </div>
  );
}

export default TranscriptionResult;