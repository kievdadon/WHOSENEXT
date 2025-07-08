// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDN8y6QkjVlPR_9eG5dp0RG4b5iH4EaVg",
  authDomain: "familygroupchat-f5bb2.firebaseapp.com",
  projectId: "familygroupchat-f5bb2",
  storageBucket: "familygroupchat-f5bb2.firebasestorage.app",
  messagingSenderId: "219263605312",
  appId: "1:219263605312:web:45ba54b1b6188ecd40dda5",
  measurementId: "G-7X6Y0VXBKR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
