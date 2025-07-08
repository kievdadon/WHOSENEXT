import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import './FamilyGroupChat.css';

export default function FamilyGroupChat({ user }) {
  const { groupId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, `groups/${groupId}/messages`),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addDoc(collection(db, `groups/${groupId}/messages`), {
      text,
      sender: user?.email || 'Anonymous',
      createdAt: serverTimestamp(),
    });
    setText('');
  };

  return (
    <div className="chat-container">
      <h1>👨‍👩‍👧‍👦 Family Group Chat</h1>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className="chat-message">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
