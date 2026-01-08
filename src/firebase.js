// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByCeXcfwBliAfn8Csic2THnwl5xHrrgbE",
  authDomain: "event-loop-visualizer.firebaseapp.com",
  projectId: "event-loop-visualizer",
  storageBucket: "event-loop-visualizer.firebasestorage.app",
  messagingSenderId: "660815621028",
  appId: "1:660815621028:web:9e809da0e61b4a03e9ef31",
  measurementId: "G-G4PJEG0QXJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
