
import React, { useState, useEffect } from 'react';

function App() {
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: storeItem }),
    });
    const data = await res.json();
    alert(data.message);
    setStoreList(data.store_list);
  };

  const getStoreList = async () => {
    const res = await fetch('http://localhost:5000/store/list', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    setStoreList(data.store_list);
  };

  return (
    <div style={{ padding: 20 }}>
      {!loggedIn ? (
        <div>
          <h2>WHOSENXT Login/Signup</h2>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
          <button onClick={signup}>Sign Up</button>
          <button onClick={login}>Log In</button>
        </div>
      ) : (
        <div>
          <h2>Welcome to WHOSENXT</h2>
          <button onClick={startListening}>🎙️ Speak your check-in</button><br/>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} cols={50} /><br/>
          <button onClick={sendCheckin}>Send Check-In</button>
          <p>Reply: {reply}</p>

          <h3>Store Support</h3>
          <input placeholder="Add Store Item" value={storeItem} onChange={e => setStoreItem(e.target.value)} />
          <button onClick={addItem}>Add Item</button>
          <button onClick={getStoreList}>Get Store List</button>
          <ul>
            {storeList.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
