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
  apiKey: "AIzaSyC0QPtM_nfZBBeBeqy1F1Sm9zbyNdZqfz0",
  authDomain: "fuelflux-in.firebaseapp.com",
  projectId: "fuelflux-in",
  storageBucket: "fuelflux-in.firebasestorage.app",
  messagingSenderId: "1021137956071",
  appId: "1:1021137956071:web:097105879968e2bb344642",
  measurementId: "G-BDTWCXXZCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);