import React, { useState, useEffect, useRef } from "react";

// Check browser support
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setMessage(text);
      handleReply(text);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  }, []);

  function startListening() {
    if (recognition) recognition.start();
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    synthRef.current.speak(utterance);
  }

  function handleReply(inputText) {
    // Simple rules-based response (or call your backend here)
    let response = "I'm here for you.";
    const lower = inputText.toLowerCase();

    if (lower.includes("hello")) response = "Hi there!";
    else if (lower.includes("how are you")) response = "I'm doing well, thank you.";
    else if (lower.includes("check in") || lower.includes("wellness"))
      response = "Let me know how you're feeling today.";
    else if (lower.includes("thank you")) response = "You're welcome!";
    else if (lower.includes("who's next")) response = "You are next. Let’s do this together.";

    setReply(response);
    speak(response);
  }

  return (
    <div style={styles.container}>
      <h2>🎤 WHOSENXT Voice Assistant</h2>

      <button style={styles.button} onClick={startListening} disabled={isListening}>
        {isListening ? "Listening..." : "Next"}
      </button>

      <div style={styles.box}>
        <strong>You said:</strong>
        <p>{message || "Tap the button and speak..."}</p>
      </div>

      {reply && (
        <div style={styles.box}>
          <strong>WHOSENXT replied:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#f4f4f4",
    fontFamily: "'Segoe UI', sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  button: {
    padding: "12px 20px",
    fontSize: 18,
    borderRadius: 12,
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: 12,
  },
  box: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    textAlign: "left",
  },
};
