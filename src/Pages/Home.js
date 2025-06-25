import React, { useState, useEffect } from 'react';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [storeItem, setStoreItem] = useState('');
  const [storeList, setStoreList] = useState([]);

  // Voice recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!recognition) return;
    recognition.lang = 'en-US';
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };
  }, [recognition]);

  const startListening = () => {
    if (recognition) recognition.start();
  };

  const signup = async () => {
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    alert((await res.json()).message);
  };

  const login = async () => {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) setLoggedIn(true);
  };

  const sendCheckin = async () => {
    const res = await fetch('http://localhost:5000/checkin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  const addItem = async () => {
    const res = await fetch('http://localhost:5000/store/add', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'app
