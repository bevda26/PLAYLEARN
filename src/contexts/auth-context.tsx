
// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
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
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const subscribeToUserProgress = useUserProgressStore(state => state.subscribeToUserProgress);
  const resetProgress = useUserProgressStore(state => state.resetProgress);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      let userProfileUnsubscribe = () => {};
      let userProgressUnsubscribe = () => {};

      if (user) {
        // User is signed in, listen for profile changes
        const profileRef = doc(db, 'user-profiles', user.uid);
        userProfileUnsubscribe = onSnapshot(profileRef, (docSnap) => {
          if (docSnap.exists()) {
            const profile = docSnap.data() as UserProfile;
            setUserProfile(profile);
            // Check if the logged-in user is the admin
            setIsAdmin(user.uid === process.env.NEXT_PUBLIC_ADMIN_USER_ID);
          } else {
            // This can happen briefly during account creation
            setUserProfile(null);
            setIsAdmin(false);
          }
        });

        // Subscribe to user progress in Zustand store
        userProgressUnsubscribe = subscribeToUserProgress(user.uid);
        
      } else {
        // User is signed out
        setUserProfile(null);
        setIsAdmin(false);
        resetProgress(); // Clear progress store on logout
      }

      setUser(user);
      setLoading(false);

      return () => {
        userProfileUnsubscribe();
        userProgressUnsubscribe();
      };
    });

    return () => unsubscribeAuth();
  }, [subscribeToUserProgress, resetProgress]);

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
