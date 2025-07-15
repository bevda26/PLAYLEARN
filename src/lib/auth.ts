
// src/lib/auth.ts
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth';
import { app, db, auth } from './firebase'; 
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Function to create user documents if they don't exist
const createUserDocuments = async (user: User) => {
  // Create public user profile
  const profileRef = doc(db, 'user-profiles', user.uid);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    try {
      await setDoc(profileRef, {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName || 'New Adventurer',
        avatar: user.photoURL || `https://placehold.co/128x128/5534A5/FFFFFF.png?text=${(user.email || 'A')[0].toUpperCase()}`,
        title: 'Novice Learner',
        unlockedAchievements: {},
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating user profile: ", error);
      throw error;
    }
  }

  // Create private user progress
  const progressRef = doc(db, 'user-progress', user.uid);
  const progressSnap = await getDoc(progressRef);

  if (!progressSnap.exists()) {
    try {
      await setDoc(progressRef, {
        userId: user.uid,
        xp: 0,
        level: 1,
        health: 100,
        questsCompleted: {},
        inventory: [], // Initialize empty inventory
      });
    } catch (error) {
      console.error("Error creating user progress: ", error);
      throw error;
    }
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserDocuments(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDocuments(userCredential.user);
    return userCredential.user;
};

export const signInWithEmailAndPasswordInternal = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Ensure documents exist for users who signed in but might not have them
    await createUserDocuments(userCredential.user); 
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
