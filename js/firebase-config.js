// Import required Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDso8BvtRWPmM4kkKowZKl3zHrsxdJ0ct8",
  authDomain: "herbipedia-81e3b.firebaseapp.com",
  projectId: "herbipedia-81e3b",
  storageBucket: "herbipedia-81e3b.firebasestorage.app",
  messagingSenderId: "247808365981",
  appId: "1:247808365981:web:c673e40ef22edb05758b74",
  measurementId: "G-F2FZ1W39J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firebase config loaded");
