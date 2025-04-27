// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCFeUvjVrTXn__NujeoB9y_zcqGPAug9X4",
  authDomain: "prepwise-d24a5.firebaseapp.com",
  projectId: "prepwise-d24a5",
  storageBucket: "prepwise-d24a5.firebasestorage.app",
  messagingSenderId: "734399572981",
  appId: "1:734399572981:web:dec977731ca36b24c0cebc",
  measurementId: "G-DD009T151Y"
};

// Initialize Firebase
export const app = !getApps.length? initializeApp(firebaseConfig):getApp();
export const auth=getAuth(app);
export const db=getFirestore(app);
