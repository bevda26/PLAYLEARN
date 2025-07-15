import { create } from 'zustand';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProgress } from '@/lib/types';

// XP needed to advance to the next level, indexed by current level (level 1 -> 2 is at index 1)
const LEVEL_XP_MAP: { [key: number]: number } = {
  1: 100,
  2: 250,
  3: 500,
  4: 1000,
  5: 2000,
};

interface UserProgressState extends UserProgress {
  xpToNextLevel: number;
  subscribeToUserProgress: (uid: string) => () => void;
  resetProgress: () => void;
}

// Store this unsubscribe function outside of the store's state
let unsubscribe: (() => void) | null = null;

export const useUserProgressStore = create<UserProgressState>((set) => ({
  // Default initial state
  userId: '',
  xp: 0,
  level: 1,
  health: 100,
  questsCompleted: {},
  inventory: [],
  xpToNextLevel: LEVEL_XP_MAP[1],

  subscribeToUserProgress: (uid: string) => {
    // Unsubscribe from any previous listener
    if (unsubscribe) {
      unsubscribe();
    }
    
    const docRef = doc(db, 'user-progress', uid);
    
    unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const progress = docSnap.data() as Omit<UserProgress, 'userId'>;
        set({
          userId: uid,
          ...progress,
          inventory: progress.inventory || [], // Ensure inventory is at least an empty array
          xpToNextLevel: LEVEL_XP_MAP[progress.level] || Infinity,
        });
      }
    });
    
    // Return the unsubscribe function so components can clean up
    return unsubscribe;
  },
  
  resetProgress: () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    set({
      userId: '',
      level: 1,
      xp: 0,
      xpToNextLevel: LEVEL_XP_MAP[1],
      health: 100,
      questsCompleted: {},
      inventory: [],
    });
  },
}));
