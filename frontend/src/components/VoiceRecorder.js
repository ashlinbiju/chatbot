import React, { useState } from 'react';
import './VoiceRecorder.css';

const VoiceRecorder = ({ handleVoiceSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please ensure you have given permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const submitVoiceMessage = () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav'); // Append audio Blob as 'audio.wav'

    // Call handleVoiceSubmit function to send the audio to the backend
    handleVoiceSubmit(formData);
  };

  return (
    <div className="voice-recorder">
      <div className="recorder-controls">
        <button onClick={startRecording} disabled={isRecording} className={isRecording ? 'recording' : ''}>
          {isRecording ? 'Recording...' : 'Start Recording'}
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
      </div>
      <button onClick={submitVoiceMessage} className="voice-send-btn" disabled={!audioBlob}>
        Send Voice Message
      </button>
    </div>
  );
};

export default VoiceRecorder;
