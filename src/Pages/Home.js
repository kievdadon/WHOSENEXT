import React, { useState, useEffect } from "react";
import "./Home.css"; // Make sure to create the Home.css file for styling

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  // Voice recognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!recognition) return;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };
  }, [recognition]);

  const startListening = () => {
    if (recognition) recognition.start();
  };

  const signup = async () => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    alert((await res.json()).message);
  };

  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) setLoggedIn(true);
  };

  const sendCheckin = async () => {
    const res = await fetch("http://localhost:5000/checkin", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-heading">
          Welcome to <span>WHOSENXT</span>
        </h1>
        <p className="welcome-subheading">
          Your personal digital assistant, here to check in, help with tasks,
          and more!
        </p>
      </div>

      {!loggedIn ? (
        <div className="login-section">
          <h2 className="login-title">Log In or Sign Up</h2>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button onClick={signup} className="action-button">
            Sign Up
          </button>
          <button onClick={login} className="action-button">
            Log In
          </button>
        </div>
      ) : (
        <div className="logged-in-section">
          <button onClick={startListening} className="mic-button">
            🎙️ Speak your check-in
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            cols={50}
            className="text-area"
          />
          <button onClick={sendCheckin} className="action-button">
            Send Check-In
          </button>
          <p className="reply-text">Reply: {reply}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
