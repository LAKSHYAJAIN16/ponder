import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAz5lGTj7Eglpbpu05FMewwxp1rBbr09-o",
  authDomain: "ponder-3822a.firebaseapp.com",
  projectId: "ponder-3822a",
  storageBucket: "ponder-3822a.appspot.com",
  messagingSenderId: "401377676742",
  appId: "1:401377676742:web:81dd036defc5de1252b6c7",
  measurementId: "G-75960WW5HT",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);