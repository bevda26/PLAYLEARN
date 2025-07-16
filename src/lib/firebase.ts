// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
    getFirestore, 
    initializeFirestore,
    enableMultiTabIndexedDbPersistence,
    persistentLocalCache,
    persistentMultipleTabManager
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyATWWAiPE6fabMRwSb6UiZbON1o5kfzMaE",
  authDomain: "questlearn-4s8sl.firebaseapp.com",
  projectId: "questlearn-4s8sl",
  storageBucket: "questlearn-4s8sl.appspot.com",
  messagingSenderId: "136336171335",
  appId: "1:136336171335:web:883d5de4d230cde3606c62"
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || firebaseConfig.apiKey.startsWith("YOUR_")) {
  console.error('Firebase config is not set. Please add your Firebase credentials to your environment.');
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
let db = getFirestore(app);
let persistenceEnabled: Promise<boolean>;

if (typeof window !== 'undefined') {
  // Client-side execution
  try {
    persistenceEnabled = enableMultiTabIndexedDbPersistence(db).then(() => true, (err) => {
      if (err.code == 'failed-precondition') {
          console.warn("Firestore persistence failed (failed-precondition). This happens when multiple tabs are open. Data will not be synced offline in this tab.");
      } else if (err.code == 'unimplemented') {
          console.warn("Firestore persistence is not available in this browser. Data will not be synced offline.");
      }
      return false;
    });
    
    // Re-initialize Firestore with persistence settings.
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    });

  } catch (error) {
    console.error("Error enabling Firestore persistence", error);
    persistenceEnabled = Promise.resolve(false);
  }
} else {
  // Server-side execution
  persistenceEnabled = Promise.resolve(false);
}

export { app, db, auth, persistenceEnabled };