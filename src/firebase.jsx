import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaKQ10nC619R0vMRZl0kiM8Dl25KS7vXo",
    authDomain: "todo-8a06b.firebaseapp.com",
    projectId: "todo-8a06b",
    storageBucket: "todo-8a06b.firebasestorage.app",
    messagingSenderId: "1058578406634",
    appId: "1:1058578406634:web:05aa25d4b0a4885a388b93"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };