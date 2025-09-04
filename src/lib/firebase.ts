// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_BLIz6Hi7toBDqWBAjykfpUFX3uajcuQ",
  authDomain: "payhx-23733.firebaseapp.com",
  projectId: "payhx-23733",
  storageBucket: "payhx-23733.appspot.com",
  messagingSenderId: "707365841426",
  appId: "1:931809729784:web:2cfe76b67ecf241dbc2f0d",
  measurementId: "G-CVBYLXZF80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

