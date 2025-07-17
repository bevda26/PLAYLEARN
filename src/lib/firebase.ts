// src/lib/firebase.ts - Updated Firebase Configuration
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
    getFirestore,
    enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Direct configuration - replace with your actual values
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyB-xR0k_e_k_123456", // This is a placeholder, will be replaced by the actual project key
    authDomain: "playlearn-tech.firebaseapp.com",
    projectId: "playlearn-tech",
    storageBucket: "playlearn-tech.appspot.com",
    messagingSenderId: "1234567890", // This is a placeholder
    appId: "1:1234567890:web:1234567890abcdef" // This is a placeholder
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

// Configure auth settings
auth.useDeviceLanguage();

// A promise that resolves when persistence is enabled on the client.
let persistenceEnabled: Promise<void>;

if (typeof window !== 'undefined') {
  // We are on the client
  persistenceEnabled = enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.warn("Firestore persistence failed (failed-precondition). This can happen with multiple tabs open. Data will not be synced offline in this tab.");
    } else if (err.code == 'unimplemented') {
        console.warn("Firestore persistence is not available in this browser. Data will not be synced offline.");
    }
    return Promise.resolve();
  });
} else {
  // We are on the server
  persistenceEnabled = Promise.resolve();
}

export { app, db, auth, persistenceEnabled };
