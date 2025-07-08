// VoiceAssistant.jsx
import React, { useState, useEffect, useRef } from 'react';
import './VoiceAssistant.css';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setMessage(text);
      handleReply(text);
    };
  }, []);

  const startListening = () => {
    if (recognition && !isListening) recognition.start();
  };

  const speak = (text) => {
    if (!synthRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synthRef.current.speak(utterance);
  };

  const handleReply = (input) => {
    let response = "I'm here for you.";
    const cmd = input.toLowerCase();
    if (cmd.includes('hello')) response = 'Hi there!';
    else if (cmd.includes('how are you')) response = "I'm doing well, thank you.";
    else if (cmd.includes('check in')) response = 'How are you feeling today?';
    else if (cmd.includes('thank you')) response = "You're welcome!";
    else if (cmd.includes("who's next")) response = 'You are. Let’s get started.';

    setReply(response);
    speak(response);
  };

  if (!recognition) {
    return (
      <main className="voice-wrapper">
        <p className="voice-error">
          Speech recognition is not supported in this browser.
        </p>
      </main>
    );
  }

  return (
    <main className="voice-wrapper">
      <div
        className="voice-card"
        role="region"
        aria-labelledby="voice-title"
      >
        <header>
          <h2 id="voice-title" className="voice-title">
            🎤 Talk to WHOSENXT
          </h2>
        </header>

        <button
          type="button"
          className={`voice-button ${
            isListening ? 'voice-button--listening' : ''
          }`}
          onClick={startListening}
          aria-pressed={isListening}
          aria-label={isListening ? 'Listening' : 'Start voice assistant'}
        >
          {isListening ? 'Listening…' : 'Speak'}
        </button>

        <section
          className="voice-box"
          aria-labelledby="user-said"
        >
          <h3 id="user-said" className="visually-hidden">
            You said:
          </h3>
          <p className="voice-text">
            {message || "Press 'Speak' and talk..."}
          </p>
        </section>

        {reply && (
          <section
            className="voice-box"
            aria-labelledby="assistant-replied"
          >
            <h3 id="assistant-replied" className="visually-hidden">
              Assistant replied:
            </h3>
            <p className="voice-text">{reply}</p>
          </section>
        )}
      </div>
    </main>
  );
}
