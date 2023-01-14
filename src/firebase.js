// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf_T4otDw956BDSWOiP8EX0eQxC2hWgyQ",
  authDomain: "shehacks-app.firebaseapp.com",
  projectId: "shehacks-app",
  storageBucket: "shehacks-app.appspot.com",
  messagingSenderId: "565894211504",
  appId: "1:565894211504:web:6ab47b541b0376aff61875",
  measurementId: "G-WFR2753YKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { app, auth, db as default }