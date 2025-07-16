// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyATWWAiPE6fabMRwSb6UiZbON1o5kfzMaE",
  authDomain: "questlearn-4s8sl.firebaseapp.com",
  projectId: "questlearn-4s8sl",
  storageBucket: "questlearn-4s8sl.appspot.com",
  messagingSenderId: "136336171335",
  appId: "1:136336171335:web:883d5de4d230cde3606c62"
};

// A check to make sure all firebase config values are present
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
  console.error('Firebase config is not set. Please add your Firebase credentials to .env file');
}


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Enable offline persistence
if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db)
      .catch((err) => {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a time.
          console.warn('Firestore persistence failed: multiple tabs open.');
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          console.warn('Firestore persistence not available in this browser.');
        }
      });
}


export { app, db, auth };
