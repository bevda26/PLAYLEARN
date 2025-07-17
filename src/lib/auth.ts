// src/lib/auth.ts - Updated with better error handling
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signOut,
  connectAuthEmulator,
  type User
} from 'firebase/auth';
import { app, db, auth, persistenceEnabled } from './firebase'; 
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

// Initialize Auth Emulator in development (optional)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Uncomment the line below if you want to use Firebase Auth Emulator
  // connectAuthEmulator(auth, "http://localhost:9099");
}

// Function to create user documents if they don't exist
const createUserDocuments = async (user: User) => {
  console.log('Creating user documents for:', user.uid);
  
  try {
    // This is crucial: wait for persistence to be enabled before trying to access Firestore.
    await persistenceEnabled;

    // Create public user profile
    const profileRef = doc(db, 'user-profiles', user.uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      console.log('Creating user profile...');
      await setDoc(profileRef, {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName || 'New Adventurer',
        avatar: user.photoURL || `https://api.dicebear.com/8.x/adventurer/svg?seed=${user.uid}`,
        title: 'Novice Learner',
        unlockedAchievements: {},
        createdAt: serverTimestamp(),
        skillPoints: 0,
        attributes: {
          intellect: 0,
          luck: 0,
        }
      });
      console.log('User profile created successfully');
    }

    // Create private user progress
    const progressRef = doc(db, 'user-progress', user.uid);
    const progressSnap = await getDoc(progressRef);

    if (!progressSnap.exists()) {
      console.log('Creating user progress...');
      await setDoc(progressRef, {
        userId: user.uid,
        xp: 0,
        level: 1,
        health: 100,
        questsCompleted: {},
        inventory: {},
        trialProgress: {},
      });
      console.log('User progress created successfully');
    }
  } catch (error: any) {
    console.error("Error creating user documents: ", error);
    throw new Error(`Failed to create user documents: ${error.message}`);
  }
};

export const signInWithGoogle = async () => {
  console.log('Attempting Google sign in...');
  const googleProvider = new GoogleAuthProvider();
  
  // Add additional scopes if needed
  googleProvider.addScope('profile');
  googleProvider.addScope('email');
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign in successful:', result.user.uid);
    await createUserDocuments(result.user);
    return result.user;
  } catch (error: any) {
    console.error("Google sign in error: ", error);
    
    // Handle specific error codes
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by browser. Please allow popups for this site.');
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign in was cancelled. Please try again.');
    } else if (error.code === 'auth/api-key-not-valid') {
      throw new Error('Firebase configuration error. Please check your API key.');
    } else {
      throw new Error(`Sign in failed: ${error.message}`);
    }
  }
};

export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  console.log('Attempting email signup for:', email);
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Email signup successful:', userCredential.user.uid);
    await createUserDocuments(userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Email signup error: ", error);
    
    // Handle specific error codes
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('An account with this email already exists. Please sign in instead.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please choose a stronger password.');
    } else if (error.code === 'auth/api-key-not-valid') {
      throw new Error('Firebase configuration error. Please check your API key.');
    } else {
      throw new Error(`Sign up failed: ${error.message}`);
    }
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  console.log('Attempting email signin for:', email);
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  try {
    const userCredential = await signInWithEmailAndPasswordFirebase(auth, email, password);
    console.log('Email signin successful:', userCredential.user.uid);
    // Ensure documents exist for users who signed in but might not have them
    await createUserDocuments(userCredential.user); 
    return userCredential.user;
  } catch (error: any) {
    console.error("Email signin error: ", error);
    
    // Handle specific error codes
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email. Please sign up first.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.');
    } else if (error.code === 'auth/api-key-not-valid') {
      throw new Error('Firebase configuration error. Please check your API key.');
    } else {
      throw new Error(`Sign in failed: ${error.message}`);
    }
  }
};

export const signOutUser = async () => {
  try {
    console.log('Signing out user...');
    await signOut(auth);
    console.log('Sign out successful');
  } catch (error: any) {
    console.error("Error signing out: ", error);
    throw new Error(`Sign out failed: ${error.message}`);
  }
};

export const onAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export async function updateUserProfile(userId: string, data: { displayName?: string; avatar?: string }) {
    const profileRef = doc(db, 'user-profiles', userId);
    try {
        await updateDoc(profileRef, data);
        console.log('User profile updated successfully');
    } catch (error: any) {
        console.error("Error updating user profile:", error);
        throw new Error(`Profile update failed: ${error.message}`);
    }
}
