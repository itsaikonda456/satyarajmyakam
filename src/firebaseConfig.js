// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBegok9XtJeSNvLgowkhw-WwFr_ZT7j_X8",
  authDomain: "satyasfx-be555.firebaseapp.com",
  projectId: "satyasfx-be555",
  storageBucket: "satyasfx-be555.firebasestorage.app",
  messagingSenderId: "70721225363",
  appId: "1:70721225363:web:2bebe6aa01fc0c615c4366",
  measurementId: "G-MPFF6RW46B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);