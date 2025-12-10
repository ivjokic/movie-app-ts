// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYp7zKxsCSDb0q7llZAbxmsJ_wyn-oSnE",
  authDomain: "movie-app-auth-dc2df.firebaseapp.com",
  projectId: "movie-app-auth-dc2df",
  storageBucket: "movie-app-auth-dc2df.firebasestorage.app",
  messagingSenderId: "178634106566",
  appId: "1:178634106566:web:857a3f8505ced1097e99c7",
  measurementId: "G-2E8CCSWEGY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
