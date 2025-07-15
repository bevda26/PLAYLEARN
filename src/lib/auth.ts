// src/lib/auth.ts
import { 
  getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth';
import { app, db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// Function to create a user profile if it doesn't exist
const createUserProfileIfNotExists = async (user: User) => {
  const userRef = doc(db, 'user-profiles', user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // Document doesn't exist, so create it
    try {
      await setDoc(userRef, {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName || 'New Adventurer',
        avatar: user.photoURL || `https://placehold.co/128x128/5534A5/FFFFFF.png?text=${(user.email || 'A')[0]}`,
        title: 'Novice Learner',
        publicStats: {
            questsCompleted: 0,
            xp: 0,
            level: 1
        },
        settings: {
            sound: true,
            notifications: true,
        }
      });
    } catch (error) {
      console.error("Error creating user profile: ", error);
      throw error;
    }
  }
  // If document exists, do nothing.
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserProfileIfNotExists(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfileIfNotExists(userCredential.user);
    return userCredential.user;
};

export const signInWithEmailAndPasswordInternal = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export { signInWithEmailAndPassword };

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

export const onAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
