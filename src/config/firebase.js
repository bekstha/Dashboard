// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBW9lhlIzhSsU6lcwQSi6iP_zvdzKLPCAo",
  authDomain: "kasthamandap-cdfd4.firebaseapp.com",
  projectId: "kasthamandap-cdfd4",
  storageBucket: "kasthamandap-cdfd4.appspot.com",
  messagingSenderId: "1081740869330",
  appId: "1:1081740869330:web:003ff34e14cacd3027770b",
  measurementId: "G-Q482EQTMX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user);
  } else {
    // User is signed out
    console.log("User is signed out");
  }
});

export { auth }
export const db = getFirestore(app);