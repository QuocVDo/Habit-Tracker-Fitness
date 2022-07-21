// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBGKg_glc_ztCvPBQaADyIC-jCBvP_nsE8',
  authDomain: 'habit-tracker-5498a.firebaseapp.com',
  projectId: 'habit-tracker-5498a',
  storageBucket: 'habit-tracker-5498a.appspot.com',
  messagingSenderId: '100720528960',
  appId: '1:100720528960:web:18a35bfe598bbf9eca59a5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
