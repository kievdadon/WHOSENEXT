import React, { useState, useEffect, useRef } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
    let response = "I'm here for you.";
    const lower = inputText.toLowerCase();

    if (lower.includes("hello")) response = "Hi there!";
    else if (lower.includes("how are you")) response = "I'm doing well, thank you.";
    else if (lower.includes("check in")) response = "How are you feeling today?";
    else if (lower.includes("thank you")) response = "You're welcome!";
    else if (lower.includes("who's next")) response = "You are. Let's get started.";

    setReply(response);
    speak(response);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎤 Talk to WHOSENXT</h2>

        <button
          style={isListening ? styles.listeningBtn : styles.listenBtn}
          onClick={startListening}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "Next"}
        </button>

        <div style={styles.box}>
          <label style={styles.label}>You said:</label>
          <p style={styles.text}>{message || "Press 'Next' and speak..."}</p>
        </div>

        {reply && (
          <div style={styles.box}>
            <label style={styles.label}>WHOSENXT replied:</label>
            <p style={styles.text}>{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#F3E5F5", // light lavender
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 30,
    maxWidth: 400,
    width: "100%",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "'Baloo 2', cursive",
  },
  title: {
    fontSize: "24px",
    color: "#6A1B9A", // deeper purple
    marginBottom: 20,
  },
  listenBtn: {
    backgroundColor: "#8E24AA",
    color: "#fff",
    padding: "12px 24px",
    fontSize: 18,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    marginBottom: 20,
  },
  listeningBtn: {
    backgroundColor: "#CE93D8",
    color: "#333",
    padding: "12px 24px",
    fontSize: 18,
    border: "none",
    borderRadius: 12,
    marginBottom: 20,
    cursor: "not-allowed",
  },
  box: {
    backgroundColor: "#F8F4FC",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    textAlign: "left",
  },
  label: {
    fontWeight: "bold",
    color: "#6A1B9A",
  },
  text: {
    margin: "8px 0 0",
    fontSize: 16,
    color: "#333",
  },
};
