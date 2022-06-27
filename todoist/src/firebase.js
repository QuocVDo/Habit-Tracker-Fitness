// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAFxdek14xW9EAg25QY33zLIp8lF6x4ADY',
  authDomain: 'todoist-clone-a1b6b.firebaseapp.com',
  projectId: 'todoist-clone-a1b6b',
  storageBucket: 'todoist-clone-a1b6b.appspot.com',
  messagingSenderId: '1058429002191',
  appId: '1:1058429002191:web:baf9679624d4213a0532ba',
  measurementId: 'G-NWEBKJ0Q05',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
