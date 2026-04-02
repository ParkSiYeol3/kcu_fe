// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuCiD-clvPqYViVr9jjqRDAigIMOehAYc",
  authDomain: "pokemon-login-cf612.firebaseapp.com",
  projectId: "pokemon-login-cf612",
  storageBucket: "pokemon-login-cf612.firebasestorage.app",
  messagingSenderId: "512322466453",
  appId: "1:512322466453:web:35c3aa8915cc92bcfea19c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);