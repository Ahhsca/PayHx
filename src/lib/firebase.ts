// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl0E7FXQHvxQSt6tru2NlmjAr3C4Wju9k",
  authDomain: "payhx-23733.firebaseapp.com",
  databaseURL: "https://payhx-23733-default-rtdb.firebaseio.com",
  projectId: "payhx-23733",
  storageBucket: "payhx-23733.firebasestorage.app",
  messagingSenderId: "707365841426",
  appId: "1:707365841426:web:279818ea3c1a2b635f86cb",
  measurementId: "G-6DG26GDX1C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
