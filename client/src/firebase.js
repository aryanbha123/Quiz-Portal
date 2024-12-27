// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Correct import for auth

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD1lJTwy7mCzQQFmREy2Fg_LY1axRY6dJs",
  authDomain: "techease-portal.firebaseapp.com",
  projectId: "techease-portal",
  storageBucket: "techease-portal.firebasestorage.app",
  messagingSenderId: "182983281004",
  appId: "1:182983281004:web:198d5b927d3d75a57d8b49",
  measurementId: "G-1JJSCX9B1E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Authentication and GoogleAuthProvider
export const auth = getAuth(app);  // Initialize Firebase Auth
export const googleAuthProvider = new GoogleAuthProvider();  // Initialize GoogleAuthProvider

// Initialize Analytics
const analytics = getAnalytics(app);
