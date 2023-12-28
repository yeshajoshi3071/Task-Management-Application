// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";    
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiK50CN9xEn1fG_Z3-LKuSbx6r23HMRTs",
  authDomain: "kanban-b1908.firebaseapp.com",
  projectId: "kanban-b1908",
  storageBucket: "kanban-b1908.appspot.com",
  messagingSenderId: "619434903641",
  appId: "1:619434903641:web:2bf7d8f0cb222c2ce5c948",
  measurementId: "G-NB0Y31JSB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);