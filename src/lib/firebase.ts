// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
    getFirestore,
    enableMultiTabIndexedDbPersistence,
    Firestore
} from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

// A promise that resolves when persistence is enabled on the client.
// On the server, it resolves immediately.
let persistenceEnabled: Promise<void>;

if (typeof window !== 'undefined') {
  // We are on the client
  persistenceEnabled = enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.warn("Firestore persistence failed (failed-precondition). This can happen with multiple tabs open. Data will not be synced offline in this tab.");
    } else if (err.code == 'unimplemented') {
        console.warn("Firestore persistence is not available in this browser. Data will not be synced offline.");
    }
    // We can still continue with a non-persistent Firestore instance.
    return Promise.resolve();
  });
} else {
  // We are on the server
  persistenceEnabled = Promise.resolve();
}


export { app, db, auth, persistenceEnabled };
