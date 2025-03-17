// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_4mQlw-V73X28d96EVW_egjlwX0YAGso",
  authDomain: "volonter-27646.firebaseapp.com",
  projectId: "volonter-27646",
  storageBucket: "volonter-27646.firebasestorage.app",
  messagingSenderId: "794399407918",
  appId: "1:794399407918:web:5dfd9038510cf79f4944bf",
  measurementId: "G-3GGTP41LHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);