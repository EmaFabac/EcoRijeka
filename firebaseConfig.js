// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6hYomBEl_WjJ_Ob-DXhJ5X_jnWiV50B0",
  authDomain: "ecorijeka-ec45f.firebaseapp.com",
  projectId: "ecorijeka-ec45f",
  storageBucket: "ecorijeka-ec45f.firebasestorage.app",
  messagingSenderId: "964520579184",
  appId: "1:964520579184:web:f093955f1ff665529624b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Auth
export const auth = getAuth(app);