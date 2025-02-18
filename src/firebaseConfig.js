import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Import GoogleAuthProvider here

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClZ2CBBE8D2KtTdeWQ5rdMy4SzOmUQlbE",
  authDomain: "assignmentproject-57bc7.firebaseapp.com",
  projectId: "assignmentproject-57bc7",
  storageBucket: "assignmentproject-57bc7.firebasestorage.app",
  messagingSenderId: "848924690040",
  appId: "1:848924690040:web:d4f75d6281429d56ce8f8d",
  measurementId: "G-KYWJQFQCEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();  // Initialize the GoogleAuthProvider here

export { auth, provider };



