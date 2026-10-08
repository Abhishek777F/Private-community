// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_bIDsH3nIW7z_on-Qf-JvYB991kAY45M",
  authDomain: "private-13f25.firebaseapp.com",
  projectId: "private-13f25",
  storageBucket: "private-13f25.firebasestorage.app",
  messagingSenderId: "540265602395",
  appId: "1:540265602395:web:2bac26192dce4407e70e7e",
  measurementId: "G-8SV76BEZV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Google Authentication Provider
const googleProvider = new GoogleAuthProvider();

// Firestore Database
const db = getFirestore(app);

// Export everything needed by the website
export {
  app,
  auth,
  googleProvider,
  db
};