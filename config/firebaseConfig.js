// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBOTnsN2raAoCl0ZxfX06OcGKGeJDOEhs8",
  authDomain: "layanan-warga.firebaseapp.com",
  projectId: "layanan-warga",
  storageBucket: "layanan-warga.appspot.com",
  messagingSenderId: "832348648887",
  appId: "1:832348648887:web:d611a7b174656dc0862432",
  measurementId: "G-LWW3059KP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);