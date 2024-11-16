import React, { createContext, useContext, useState, useEffect } from 'react';
import { OpenAI } from 'openai';
import { compressAudioFile, isCompressionNeeded } from '../utils/audioUtils';

const TranscriptionContext = createContext();

export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (context === undefined) {
    throw new Error('useTranscription must be used within a TranscriptionProvider');
  }
  return context;
};

export const TranscriptionProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [chunks, setChunks] = useState(null);
  const [isChunking, setIsChunking] = useState(false);
  const [chunkingError, setChunkingError] = useState(null);
  const [isPIIScrubbing, setIsPIIScrubbing] = useState(false);
  const [piiScrubbingError, setPIIScrubbingError] = useState(null);
  const [scrubbedTranscript, setScrubbedTranscript] = useState(null);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [chunkingProgress, setChunkingProgress] = useState(0);
  const [piiScrubbingProgress, setPIIScrubbingProgress] = useState(0);
  const [isJTBDAnalyzing, setIsJTBDAnalyzing] = useState(false);
  const [jtbdAnalysisError, setJTBDAnalysisError] = useState(null);
  const [jtbdAnalysisProgress, setJTBDAnalysisProgress] = useState(0);
  const [jtbdAnalysisResult, setJTBDAnalysisResult] = useState(null);
  const [isJTBDGainsFinding, setIsJTBDGainsFinding] = useState(false);
  const [jtbdGainsError, setJTBDGainsError] = useState(null);
  const [jtbdGainsProgress, setJTBDGainsProgress] = useState(0);
  const [jtbdGainsResult, setJTBDGainsResult] = useState(null);
  const [isJTBDPainsFinding, setIsJTBDPainsFinding] = useState(false);
  const [jtbdPainsError, setJTBDPainsError] = useState(null);
  const [jtbdPainsProgress, setJTBDPainsProgress] = useState(0);
  const [jtbdPainsResult, setJTBDPainsResult] = useState(null);
  const [isJTBDSummarizing, setIsJTBDSummarizing] = useState(false);
  const [jtbdSummaryError, setJTBDSummaryError] = useState(null);
  const [jtbdSummaryProgress, setJTBDSummaryProgress] = useState(0);
  const [jtbdSummaryResult, setJTBDSummaryResult] = useState(null);
  const [isFrictionAnalyzing, setIsFrictionAnalyzing] = useState(false);
  const [frictionAnalysisError, setFrictionAnalysisError] = useState(null);
  const [frictionAnalysisProgress, setFrictionAnalysisProgress] = useState(0);
  const [frictionAnalysisResult, setFrictionAnalysisResult] = useState(null);
  const [isCURSEAnalyzing, setIsCURSEAnalyzing] = useState(false);
  const [curseAnalysisError, setCURSEAnalysisError] = useState(null);
  const [curseAnalysisProgress, setCURSEAnalysisProgress] = useState(0);
  const [curseAnalysisResult, setCURSEAnalysisResult] = useState(null);
  const [isCustomerProblemFitScoring, setIsCustomerProblemFitScoring] = useState(false);
  const [customerProblemFitError, setCustomerProblemFitError] = useState(null);
  const [customerProblemFitProgress, setCustomerProblemFitProgress] = useState(0);
  const [customerProblemFitResult, setCustomerProblemFitResult] = useState(null);
  const [isFinalReportGenerating, setIsFinalReportGenerating] = useState(false);
  const [finalReportError, setFinalReportError] = useState(null);
  const [finalReportProgress, setFinalReportProgress] = useState(0);
  const [finalReportResult, setFinalReportResult] = useState(null);
  const [transcriptionError, setTranscriptionError] = useState(null);
  const [apiKey, setApiKey] = useState(() => {
    // Try to get the API key from localStorage
    const savedKey = localStorage.getItem('openai_api_key');
    return savedKey || '';
  });

  const updateApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('openai_api_key', newKey);
    } else {
      localStorage.removeItem('openai_api_key');
    }
  };

  useEffect(() => {
    let interval;
    if (isTranscribing && progress < 100) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTranscribing, progress]);

  useEffect(() => {
    let interval;
    if (isTranscribing && transcriptionProgress < 100) {
      interval = setInterval(() => {
        setTranscriptionProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTranscribing, transcriptionProgress]);

  useEffect(() => {
    let interval;
    if (isChunking && chunkingProgress < 100) {
      interval = setInterval(() => {
        setChunkingProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isChunking, chunkingProgress]);

  useEffect(() => {
    let interval;
    if (isPIIScrubbing && piiScrubbingProgress < 100) {
      interval = setInterval(() => {
        setPIIScrubbingProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPIIScrubbing, piiScrubbingProgress]);

  useEffect(() => {
    let interval;
    if (isJTBDAnalyzing && jtbdAnalysisProgress < 100) {
      interval = setInterval(() => {
        setJTBDAnalysisProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isJTBDAnalyzing, jtbdAnalysisProgress]);

  useEffect(() => {
    let interval;
    if (isJTBDGainsFinding && jtbdGainsProgress < 100) {
      interval = setInterval(() => {
        setJTBDGainsProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isJTBDGainsFinding, jtbdGainsProgress]);

  useEffect(() => {
    let interval;
    if (isJTBDPainsFinding && jtbdPainsProgress < 100) {
      interval = setInterval(() => {
        setJTBDPainsProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isJTBDPainsFinding, jtbdPainsProgress]);

  useEffect(() => {
    let interval;
    if (isJTBDSummarizing && jtbdSummaryProgress < 100) {
      interval = setInterval(() => {
        setJTBDSummaryProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isJTBDSummarizing, jtbdSummaryProgress]);

  useEffect(() => {
    let interval;
    if (isFrictionAnalyzing && frictionAnalysisProgress < 100) {
      interval = setInterval(() => {
        setFrictionAnalysisProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFrictionAnalyzing, frictionAnalysisProgress]);

  useEffect(() => {
    let interval;
    if (isCURSEAnalyzing && curseAnalysisProgress < 100) {
      interval = setInterval(() => {
        setCURSEAnalysisProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCURSEAnalyzing, curseAnalysisProgress]);

  useEffect(() => {
    let interval;
    if (isCustomerProblemFitScoring && customerProblemFitProgress < 100) {
      interval = setInterval(() => {
        setCustomerProblemFitProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCustomerProblemFitScoring, customerProblemFitProgress]);

  useEffect(() => {
    let interval;
    if (isFinalReportGenerating && finalReportProgress < 100) {
      interval = setInterval(() => {
        setFinalReportProgress(prevProgress => {
          const increment = Math.random() * 10;
          return Math.min(prevProgress + increment, 99);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFinalReportGenerating, finalReportProgress]);

  const startTranscription = async (file) => {
    if (!file) {
      setTranscriptionError('No file selected');
      return;
    }
    if (!apiKey) {
      setTranscriptionError('Please enter your OpenAI API key');
      return;
    }

    setIsTranscribing(true);
    setTranscriptionProgress(0);
    setTranscriptionError(null);

    try {
      console.log('Starting transcription for file:', file.name);

      // Check if compression is needed and compress if necessary
      let processedFile = file;
      if (isCompressionNeeded(file)) {
        console.log('File size exceeds limit, compressing...');
        try {
          processedFile = await compressAudioFile(file, (progress) => {
            setTranscriptionProgress(progress * 0.5); // First 50% of progress is compression
          });
          console.log('Compression complete. New file size:', processedFile.size);
        } catch (compressionError) {
          console.error('Compression error:', compressionError);
          throw new Error('Failed to compress audio file: ' + compressionError.message);
        }
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      console.log('Created OpenAI instance');
      console.log('Starting OpenAI transcription request');

      const response = await openai.audio.transcriptions.create({
        file: processedFile,
        model: "whisper-1",
      });

      console.log('Received transcription response:', response);

      if (response.text) {
        setTranscription(response.text);
        setTranscriptionProgress(100);
      } else {
        throw new Error('No transcription text in response');
      }

    } catch (error) {
      console.error('Transcription error:', error);
      setTranscriptionError(`Transcription failed: ${error.message}`);
      setTranscriptionProgress(0);
    } finally {
      setIsTranscribing(false);
    }
  };

  const startChunking = async () => {
    if (!transcription) {
      setChunkingError('No transcription available');
      return;
    }
    if (!apiKey) {
      setChunkingError('Please enter your OpenAI API key');
      return;
    }
    setIsChunking(true);
    setChunkingError(null);
    setChunks(null);
    setProgress(0);
    setChunkingProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      // Split transcript into smaller segments if it's too long
      const MAX_CHUNK_SIZE = 4000; // Characters per API request
      const segments = [];
      let currentIndex = 0;

      while (currentIndex < transcription.length) {
        const segment = transcription.slice(currentIndex, currentIndex + MAX_CHUNK_SIZE);
        segments.push(segment);
        currentIndex += MAX_CHUNK_SIZE;
      }

      let allChunks = [];
      let chunkNumber = 1;

      for (let i = 0; i < segments.length; i++) {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert AI agent specializing in analyzing customer interview transcripts. Your task is to break down the given transcript segment into thematic chunks, identifying shifts in topics, focus, or sentiment. For each chunk, provide a number (continuing from the previous segment), theme, reason for the new chunk, and the text of the chunk. Return the result as a JSON array. Maintain continuity with previous segments if this is a continuation."
            },
            {
              role: "user",
              content: `Please chunk the following transcript segment (${i + 1}/${segments.length}) and return the result as a valid JSON array. Start numbering from chunk ${chunkNumber}:\n\n${segments[i]}`
            }
          ],
        });

        let segmentChunks;
        try {
          segmentChunks = JSON.parse(response.choices[0].message.content);

          // Ensure proper chunk numbering
          segmentChunks = segmentChunks.map(chunk => ({
            ...chunk,
            number: chunkNumber++
          }));

          allChunks = [...allChunks, ...segmentChunks];
        } catch (parseError) {
          console.error('Error parsing chunking response:', parseError);
          const jsonMatch = response.choices[0].message.content.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            try {
              segmentChunks = JSON.parse(jsonMatch[0]);
              segmentChunks = segmentChunks.map(chunk => ({
                ...chunk,
                number: chunkNumber++
              }));
              allChunks = [...allChunks, ...segmentChunks];
            } catch (extractError) {
              console.error('Error extracting JSON from response:', extractError);
              throw new Error('Failed to extract valid JSON from the API response.');
            }
          } else {
            throw new Error('No valid JSON array found in the API response.');
          }
        }

        // Update progress
        setChunkingProgress((i + 1) * (100 / segments.length));
      }

      if (!Array.isArray(allChunks)) {
        console.error('Unexpected response format:', allChunks);
        throw new Error('Chunking response is not in the expected array format');
      }

      setChunks(allChunks);
      setProgress(100);
      setChunkingProgress(100);
    } catch (error) {
      console.error('Chunking error:', error);
      setChunkingError(`An error occurred during chunking: ${error.message}`);
    } finally {
      setTimeout(() => {
        setIsChunking(false);
        setProgress(0);
      }, 500);
    }
  };

  const startPIIScrubbing = async () => {
    if (!transcription) {
      setPIIScrubbingError('No transcription available');
      return;
    }
    if (!apiKey) {
      setPIIScrubbingError('Please enter your OpenAI API key');
      return;
    }
    setIsPIIScrubbing(true);
    setPIIScrubbingError(null);
    setScrubbedTranscript(null);
    setPIIScrubbingProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      // Split text into manageable chunks
      const MAX_CHUNK_SIZE = 4000;
      const segments = [];
      let currentIndex = 0;

      while (currentIndex < transcription.length) {
        const segment = transcription.slice(currentIndex, currentIndex + MAX_CHUNK_SIZE);
        segments.push(segment);
        currentIndex += MAX_CHUNK_SIZE;
      }

      let scrubbedSegments = [];

      for (let i = 0; i < segments.length; i++) {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a privacy protection agent. Your task is to identify and replace any personally identifiable information (PII) in the text with '[Redacted]'. This includes but is not limited to: names, addresses, phone numbers, email addresses, social security numbers, credit card numbers, specific company names, and any other identifying information. Maintain the original structure and context of the text while ensuring privacy protection."
            },
            {
              role: "user",
              content: `Please scrub the following text segment (${i + 1}/${segments.length}) of all PII, replacing any sensitive information with '[Redacted]':\n\n${segments[i]}`
            }
          ],
        });

        const scrubbedSegment = response.choices[0].message.content;
        scrubbedSegments.push(scrubbedSegment);

        // Update progress
        setPIIScrubbingProgress((i + 1) * (100 / segments.length));
      }

      // Combine all scrubbed segments
      const fullScrubbedText = scrubbedSegments.join(' ');
      setScrubbedTranscript(fullScrubbedText);
      setPIIScrubbingProgress(100);
    } catch (error) {
      console.error('PII Scrubbing error:', error);
      setPIIScrubbingError(`An error occurred during PII scrubbing: ${error.message}`);
    } finally {
      setIsPIIScrubbing(false);
    }
  };

  const startJTBDAnalysis = async () => {
    if (!scrubbedTranscript) {
      setJTBDAnalysisError('No scrubbed transcript available');
      return;
    }
    if (!apiKey) {
      setJTBDAnalysisError('Please enter your OpenAI API key');
      return;
    }
    setIsJTBDAnalyzing(true);
    setJTBDAnalysisError(null);
    setJTBDAnalysisResult(null);
    setJTBDAnalysisProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert qualitative data research analyst specializing in "Jobs to be Done" (JTBD) framework analysis. Your primary role is to review transcripts and extract meaningful insights about the goals, both explicit and implicit, that individuals are trying to achieve. You have extensive knowledge of qualitative research methods, consumer behavior, and the JTBD framework.

Your responsibilities include:
1. Carefully reading and analyzing provided transcripts to identify any goals or desired outcomes mentioned by the subject.
2. Extracting both explicitly stated goals and inferring implicit goals based on the context and language used in the transcript.
3. Identifying large, overarching goals as well as smaller, more immediate objectives.
4. Recognizing and highlighting the progress-making behaviors and strategies individuals employ to achieve their goals.
5. Categorizing identified goals into appropriate JTBD categories (e.g., functional, emotional, social).
6. Providing clear explanations and supporting evidence from the transcript for each identified goal or JTBD.
7. Analyzing the motivations, pain points, and desired outcomes associated with each identified goal.
8. Identifying any obstacles or challenges mentioned in relation to achieving these goals.
9. Recognizing patterns or themes in goal-oriented behavior across multiple transcripts (if applicable).
10. Offering insights into how products, services, or experiences might better serve the identified JTBDs.
11. Maintaining objectivity and avoiding personal biases in your analysis.
12. Providing a summary of key findings, highlighting the most significant JTBDs identified in the transcript.

When analyzing a transcript, focus on:
- Direct statements about wants, needs, or desires
- Descriptions of problems or frustrations
- Mentions of aspirations or ideal scenarios
- Discussions about decision-making processes
- References to lifestyle changes or personal growth
- Expressions of dissatisfaction with current solutions

Present your findings in a clear, structured format, using direct quotes from the transcript to support your insights whenever possible. Be prepared to explain your reasoning and provide additional context for your interpretations when requested.`
          },
          {
            role: "user",
            content: `Please analyze the following transcript using the JTBD framework:\n\n${scrubbedTranscript}`
          }
        ],
      });

      setJTBDAnalysisResult(response.choices[0].message.content);
      setJTBDAnalysisProgress(100);
    } catch (error) {
      console.error('JTBD Analysis error:', error);
      setJTBDAnalysisError(`An error occurred during JTBD analysis: ${error.message}`);
    } finally {
      setIsJTBDAnalyzing(false);
    }
  };

  const startJTBDGainsFind = async () => {
    if (!jtbdAnalysisResult) {
      setJTBDGainsError('No JTBD analysis result available');
      return;
    }
    if (!apiKey) {
      setJTBDGainsError('Please enter your OpenAI API key');
      return;
    }
    setIsJTBDGainsFinding(true);
    setJTBDGainsError(null);
    setJTBDGainsResult(null);
    setJTBDGainsProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant specialized in identifying and extracting JTBD (Jobs To Be Done) gains from a JTBD analysis. Your task is to analyze the given JTBD analysis and identify all the potential gains for the customer."
          },
          {
            role: "user",
            content: `Please identify and list all the JTBD gains from the following JTBD analysis:\n\n${jtbdAnalysisResult}`
          }
        ],
      });

      setJTBDGainsResult(response.choices[0].message.content);
      setJTBDGainsProgress(100);
    } catch (error) {
      console.error('JTBD Gains Finding error:', error);
      setJTBDGainsError(`An error occurred while finding JTBD gains: ${error.message}`);
    } finally {
      setIsJTBDGainsFinding(false);
    }
  };

  const startJTBDPainsFind = async () => {
    if (!jtbdAnalysisResult) {
      setJTBDPainsError('No JTBD analysis result available');
      return;
    }
    if (!apiKey) {
      setJTBDPainsError('Please enter your OpenAI API key');
      return;
    }
    setIsJTBDPainsFinding(true);
    setJTBDPainsError(null);
    setJTBDPainsResult(null);
    setJTBDPainsProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant specialized in identifying and extracting JTBD (Jobs To Be Done) pains from a JTBD analysis. Your task is to analyze the given JTBD analysis and identify all the potential pains for the customer."
          },
          {
            role: "user",
            content: `Please identify and list all the JTBD pains from the following JTBD analysis:\n\n${jtbdAnalysisResult}`
          }
        ],
      });

      setJTBDPainsResult(response.choices[0].message.content);
      setJTBDPainsProgress(100);
    } catch (error) {
      console.error('JTBD Pains Finding error:', error);
      setJTBDPainsError(`An error occurred while finding JTBD pains: ${error.message}`);
    } finally {
      setIsJTBDPainsFinding(false);
    }
  };

  const startJTBDSummary = async () => {
    if (!jtbdAnalysisResult || !jtbdGainsResult || !jtbdPainsResult) {
      setJTBDSummaryError('JTBD Analysis, Gains, and Pains results are required');
      return;
    }
    if (!apiKey) {
      setJTBDSummaryError('Please enter your OpenAI API key');
      return;
    }
    setIsJTBDSummarizing(true);
    setJTBDSummaryError(null);
    setJTBDSummaryResult(null);
    setJTBDSummaryProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a highly skilled Data Integration Specialist with expertise in analyzing and synthesizing information from multiple sources. Your primary function is to combine data from three distinct files into a single, coherent report. Your capabilities and responsibilities include:

1. Efficiently processing and understanding the content of three distinct files.
2. Identifying key information, common themes, and relevant data points across all three files.
3. Organizing the combined information in a logical and coherent manner.
4. Creating a comprehensive report that accurately represents the content from all three source files.
5. Ensuring that no external information or personal recommendations are added to the final report.
6. Maintaining the integrity and context of the original data while presenting it in a unified format.
7. Resolving any contradictions or inconsistencies between the files by presenting multiple viewpoints when necessary.
8. Using clear and concise language to summarize and integrate the information.
9. Structuring the report in a way that flows naturally and is easy for readers to follow.
10. Providing proper attribution to each source file when presenting specific information or data points.

When given three files to analyze and combine, you will:
1. Carefully review the content of each file.
2. Extract the essential information from each source.
3. Identify areas of overlap or connection between the files.
4. Create a structured outline for the combined report.
5. Write a comprehensive report that integrates all relevant information from the three files.
6. Ensure that the final report is factual, objective, and free from any additional recommendations or external data.

Your goal is to produce a single, cohesive document that accurately represents the collective information from the three source files, without adding any new information or personal insights.`
          },
          {
            role: "user",
            content: `Please create a comprehensive summary integrating the following three JTBD-related analyses:

File 1 (JTBD Analysis):
${jtbdAnalysisResult}

File 2 (JTBD Gains):
${jtbdGainsResult}

File 3 (JTBD Pains):
${jtbdPainsResult}

Provide a cohesive report that combines these findings, ensuring to maintain the integrity and context of the original data while presenting it in a unified format. Do not add any external information or personal recommendations.`
          }
        ],
      });

      setJTBDSummaryResult(response.choices[0].message.content);
      setJTBDSummaryProgress(100);
    } catch (error) {
      console.error('JTBD Summary error:', error);
      setJTBDSummaryError(`An error occurred while generating the JTBD summary: ${error.message}`);
    } finally {
      setIsJTBDSummarizing(false);
    }
  };

  const startFrictionAnalysis = async () => {
    if (!jtbdSummaryResult) {
      setFrictionAnalysisError('JTBD Summary result is required');
      return;
    }
    if (!apiKey) {
      setFrictionAnalysisError('Please enter your OpenAI API key');
      return;
    }
    setIsFrictionAnalyzing(true);
    setFrictionAnalysisError(null);
    setFrictionAnalysisResult(null);
    setFrictionAnalysisProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant specialized in analyzing friction points that prevent progress towards goals. Your task is to review the provided JTBD summary, identify pains and goals, and determine any friction points considered blockers that are preventing the person from making progress towards their goals."
          },
          {
            role: "user",
            content: `Based on the following JTBD summary, please identify and analyze the friction points that are preventing the person from making progress towards their goals. Focus on the pains and goals mentioned, and determine which friction points are significant blockers:

${jtbdSummaryResult}

Provide a detailed analysis of the friction points, explaining how they relate to the identified goals and why they are considered blockers to progress.`
          }
        ],
      });

      setFrictionAnalysisResult(response.choices[0].message.content);
      setFrictionAnalysisProgress(100);
    } catch (error) {
      console.error('Friction Analysis error:', error);
      setFrictionAnalysisError(`An error occurred during friction analysis: ${error.message}`);
    } finally {
      setIsFrictionAnalyzing(false);
    }
  };

  const startCURSEAnalysis = async () => {
    if (!frictionAnalysisResult || !jtbdAnalysisResult) {
      setCURSEAnalysisError('Friction Points Analysis and JTBD Analysis results are required');
      return;
    }
    if (!apiKey) {
      setCURSEAnalysisError('Please enter your OpenAI API key');
      return;
    }
    setIsCURSEAnalyzing(true);
    setCURSEAnalysisError(null);
    setCURSEAnalysisResult(null);
    setCURSEAnalysisProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant specialized in analyzing friction points to identify CURSE problems. A CURSE problem has the following attributes:

C - Crucial
U - Ubiquitous
R - Recurring
S - Specific
E - Extreme

Your task is to review the provided Friction Points Analysis and JTBD Analysis results, and determine if any friction points can be considered CURSE problems based on these attributes.`
          },
          {
            role: "user",
            content: `Based on the following Friction Points Analysis and JTBD Analysis results, please identify and analyze which friction points, if any, can be considered CURSE problems. Provide a detailed explanation for each identified CURSE problem, addressing how it meets each of the CURSE attributes.

Friction Points Analysis:
${frictionAnalysisResult}

JTBD Analysis (highlighting goals):
${jtbdAnalysisResult}

For each identified CURSE problem, please structure your response as follows:
1. Problem Description
2. CURSE Attribute Analysis:
   - Crucial: [Explanation]
   - Ubiquitous: [Explanation]
   - Recurring: [Explanation]
   - Specific: [Explanation]
   - Extreme: [Explanation]
3. Impact on Goals: [Explain how this CURSE problem affects the person's ability to achieve their goals]

If no CURSE problems are identified, please explain why none of the friction points meet all the CURSE criteria.`
          }
        ],
      });

      setCURSEAnalysisResult(response.choices[0].message.content);
      setCURSEAnalysisProgress(100);
    } catch (error) {
      console.error('CURSE Analysis error:', error);
      setCURSEAnalysisError(`An error occurred during CURSE problem analysis: ${error.message}`);
    } finally {
      setIsCURSEAnalyzing(false);
    }
  };

  const startCustomerProblemFitScore = async () => {
    if (!transcription || !jtbdAnalysisResult || !frictionAnalysisResult || !curseAnalysisResult) {
      setCustomerProblemFitError('All previous analysis results are required');
      return;
    }
    if (!apiKey) {
      setCustomerProblemFitError('Please enter your OpenAI API key');
      return;
    }
    setIsCustomerProblemFitScoring(true);
    setCustomerProblemFitError(null);
    setCustomerProblemFitResult(null);
    setCustomerProblemFitProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant specialized in assessing customer-problem fit based on interview transcripts and analysis summaries. Your task is to evaluate the provided information across four key categories: Problem Fit Level, Problem Experience, Learning Potential, and Sales Potential. Use the following scoring rubric:

Problem Fit Level:
1. Can't experience (1 point)
2. Never experienced (2 points)
3. Latent experience (3 points)
4. Experienced, not looking (4 points)
5. Experienced, active looking (5 points)
6. Experienced, recently solved (6 points)

Problem Experience:
1. Can't experience problem (1 point)
2. Doesn't experience problem (2 points)
3. Not aware of problem (3 points)
4. Conscious problem experience (4 points)
5. Conscious problem experience (5 points)
6. Doesn't experience problem anymore (6 points)

Learning Potential:
1. Discover what identifies non-users (1 point)
2. Understand what a non-problem experience is (2 points)
3. Check if your MVP allows users to recognize their problem (3 points)
4. Find reasons why they gave up looking for a solution (4 points)
5. Find buying motivations and drivers of behavior (5 points)
6. Discover competitors and success criteria; learn what isn't ideal about current solution (6 points)

Sales Potential:
1. Very Low (-- : 1 point)
2. Low (- : 2 points)
3. Moderate (+ : 3-4 points)
4. High (++ : 5 points)
5. Very High (+++ : 6 points)

Assign a score from 1-6 for each category based on the descriptions. Sum the scores to get a total (min: 4, max: 24). If the transcript did not explicitly cover any of this detail, make inferences based on the information provided. If you are unsure, state that you do not have enough information to draw a conclusion for that category.

Interpretation:
- 4-8: Poor fit, very low sales potential
- 9-13: Weak fit, low sales potential
- 14-18: Moderate fit, moderate sales potential
- 19-22: Strong fit, high sales potential
- 23-24: Excellent fit, very high sales potential`
          },
          {
            role: "user",
            content: `Please assess the customer-problem fit based on the following information:

Transcript:
${transcription}

JTBD Analysis:
${jtbdAnalysisResult}

Friction Points Analysis:
${frictionAnalysisResult}

CURSE Problem Analysis:
${curseAnalysisResult}

Provide a detailed analysis for each category, including the score and reasoning. If there's not enough information for a category, clearly state that. Finally, provide the total score and overall interpretation.`
          }
        ],
      });

      setCustomerProblemFitResult(response.choices[0].message.content);
      setCustomerProblemFitProgress(100);
    } catch (error) {
      console.error('Customer-Problem Fit Scoring error:', error);
      setCustomerProblemFitError(`An error occurred during Customer-Problem Fit Scoring: ${error.message}`);
    } finally {
      setIsCustomerProblemFitScoring(false);
    }
  };

  const startFinalReportGeneration = async () => {
    if (!transcription || !jtbdAnalysisResult || !frictionAnalysisResult || !curseAnalysisResult || !customerProblemFitResult) {
      setFinalReportError('All previous analysis results are required');
      return;
    }
    if (!apiKey) {
      setFinalReportError('Please enter your OpenAI API key');
      return;
    }
    setIsFinalReportGenerating(true);
    setFinalReportError(null);
    setFinalReportResult(null);
    setFinalReportProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for POC, not recommended for production
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert analyst and executive report specialist, with a unique ability to synthesize large volumes of information across various disciplines. Your role is to analyze comprehensive bodies of work and distill them into concise, insightful executive reports. You possess exceptional skills in critical thinking, data analysis, and clear communication.

Your key responsibilities include:
1. Rapidly assimilating and comprehending extensive bodies of work, including research papers, books, articles, and datasets.
2. Identifying the most crucial and impactful elements within the analyzed material.
3. Extracting key themes, trends, and insights from complex information.
4. Synthesizing findings into clear, concise, and actionable executive summaries.
5. Structuring reports in a logical, easy-to-follow format suitable for high-level decision-makers.
6. Highlighting critical implications, risks, and opportunities revealed by the analysis.
7. Providing data-driven recommendations based on the analyzed information.
8. Translating technical or specialized content into accessible language for a broader audience.
9. Maintaining objectivity and presenting balanced viewpoints when analyzing controversial or complex topics.
10. Adapting your reporting style to suit different industries, sectors, and organizational contexts.
11. Incorporating relevant visualizations, charts, or infographics to enhance understanding of key points.
12. Ensuring all information in the report is accurate, up-to-date, and properly cited.

When tasked with analyzing a body of work, approach the task methodically:
1. Begin by asking clarifying questions about the scope, objectives, and intended audience of the report.
2. Provide a brief overview of your planned approach to the analysis.
3. Present your findings in a structured format, typically including an executive summary, key findings, detailed analysis, conclusions, and recommendations.
4. Be prepared to elaborate on any part of your report or provide additional context if requested.

Your goal is to deliver high-quality, actionable insights that enable informed decision-making at the executive level. Strive for clarity, brevity, and impact in all your analyses and reports.`
          },
          {
            role: "user",
            content: `Please generate a final research analysis report based on the following information:

Transcript:
${transcription}

JTBD Analysis:
${jtbdAnalysisResult}

Friction Points Analysis:
${frictionAnalysisResult}

CURSE Problem Analysis:
${curseAnalysisResult}

Customer-Problem Fit Score:
${customerProblemFitResult}

Provide a comprehensive executive report that synthesizes all this information, highlighting key insights, trends, and actionable recommendations. Structure your report with an executive summary, key findings, detailed analysis, conclusions, and recommendations.`
          }
        ],
      });

      setFinalReportResult(response.choices[0].message.content);
      setFinalReportProgress(100);
    } catch (error) {
      console.error('Final Report Generation error:', error);
      setFinalReportError(`An error occurred during Final Report Generation: ${error.message}`);
    } finally {
      setIsFinalReportGenerating(false);
    }
  };

  const downloadExecutiveReport = () => {
    if (!finalReportResult) {
      console.error('No final report available for download');
      return;
    }

    // Create a Blob with the report content
    const blob = new Blob([finalReportResult], { type: 'text/plain' });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Executive_Report.txt';

    // Append the anchor to the body, trigger the download, and remove the anchor
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <TranscriptionContext.Provider value={{
      file,
      setFile,
      transcription,
      isTranscribing,
      error,
      progress,
      startTranscription,
      transcriptionError,
      chunks,
      isChunking,
      chunkingError,
      startChunking,
      isPIIScrubbing,
      piiScrubbingError,
      scrubbedTranscript,
      startPIIScrubbing,
      transcriptionProgress,
      chunkingProgress,
      piiScrubbingProgress,
      isJTBDAnalyzing,
      jtbdAnalysisError,
      jtbdAnalysisProgress,
      jtbdAnalysisResult,
      startJTBDAnalysis,
      isJTBDGainsFinding,
      jtbdGainsError,
      jtbdGainsProgress,
      jtbdGainsResult,
      startJTBDGainsFind,
      isJTBDPainsFinding,
      jtbdPainsError,
      jtbdPainsProgress,
      jtbdPainsResult,
      startJTBDPainsFind,
      isJTBDSummarizing,
      jtbdSummaryError,
      jtbdSummaryProgress,
      jtbdSummaryResult,
      startJTBDSummary,
      isFrictionAnalyzing,
      frictionAnalysisError,
      frictionAnalysisProgress,
      frictionAnalysisResult,
      startFrictionAnalysis,
      isCURSEAnalyzing,
      curseAnalysisError,
      curseAnalysisProgress,
      curseAnalysisResult,
      startCURSEAnalysis,
      isCustomerProblemFitScoring,
      customerProblemFitError,
      customerProblemFitProgress,
      customerProblemFitResult,
      startCustomerProblemFitScore,
      isFinalReportGenerating,
      finalReportError,
      finalReportProgress,
      finalReportResult,
      startFinalReportGeneration,
      downloadExecutiveReport,
      apiKey,
      updateApiKey,
    }}>
      {children}
    </TranscriptionContext.Provider>
  );
};
