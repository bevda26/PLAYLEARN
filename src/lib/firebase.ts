// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
    getFirestore,
    enableMultiTabIndexedDbPersistence,
    Firestore
} from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyATWWAiPE6fabMRwSb6UiZbON1o5kfzMaE",
  authDomain: "questlearn-4s8sl.firebaseapp.com",
  projectId: "questlearn-4s8sl",
  storageBucket: "questlearn-4s8sl.appspot.com",
  messagingSenderId: "136336171335",
  appId: "1:136336171335:web:883d5de4d230cde3606c62"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Firestore instance, will be initialized differently on client vs server
let db: Firestore;

// A promise that resolves when persistence is enabled on the client.
// On the server, it resolves immediately.
let persistenceEnabled: Promise<void>;

if (typeof window !== 'undefined') {
  // We are on the client
  db = getFirestore(app);
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
  db = getFirestore(app);
  persistenceEnabled = Promise.resolve();
}


export { app, db, auth, persistenceEnabled };
