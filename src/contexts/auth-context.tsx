// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db, persistenceEnabled } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserProfile } from '@/lib/types';
import { useUserProgressStore } from '@/stores/user-progress-store';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // This state now tracks the overall readiness of Firebase + Auth + Profile
  const [loading, setLoading] = useState(true); 
  const [isAdmin, setIsAdmin] = useState(false);
  
  const subscribeToUserProgress = useUserProgressStore(state => state.subscribeToUserProgress);
  const resetUserProgress = useUserProgressStore(state => state.resetProgress);

  useEffect(() => {
    // This function will run once persistence is enabled and auth state is known.
    const initializeApp = async () => {
      // 1. Wait for persistence to be settled. This is crucial to avoid "offline" errors.
      await persistenceEnabled;

      // 2. Subscribe to auth changes.
      const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
        
        if (authUser) {
          const adminId = process.env.NEXT_PUBLIC_ADMIN_USER_ID;
          setIsAdmin(!!adminId && authUser.uid === adminId);
          
          // Subscribe to user progress and profile stores
          subscribeToUserProgress(authUser.uid);
          const unsubscribeProfile = onSnapshot(doc(db, 'user-profiles', authUser.uid), (docSnap) => {
            setUserProfile(docSnap.exists() ? (docSnap.data() as UserProfile) : null);
            setLoading(false); // We are ready once the profile is loaded (or confirmed non-existent)
          });

          // Return a cleanup function for the profile listener
          return () => unsubscribeProfile();
        } else {
          // No user, so reset stores and finish loading.
          setIsAdmin(false);
          setUserProfile(null);
          resetUserProgress();
          setLoading(false); // Ready to show the app in a logged-out state
        }
      });

      // Return the auth cleanup function
      return unsubscribeAuth;
    };

    let unsubscribe: (() => void) | undefined;
    initializeApp().then(unsub => {
      unsubscribe = unsub;
    });

    // Cleanup on component unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [subscribeToUserProgress, resetUserProgress]);


  if (loading) {
    return (
        <div className="flex flex-col space-y-3 p-4">
          <Skeleton className="h-20 w-full rounded-xl" />
          <div className="space-y-2 mt-8">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </div>
      );
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
