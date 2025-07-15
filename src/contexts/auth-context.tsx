// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserProfile } from '@/lib/types';
import { useUserProgressStore } from '@/stores/user-progress-store';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Zustand store actions
  const subscribeToUserProgress = useUserProgressStore(state => state.subscribeToUserProgress);
  const resetUserProgress = useUserProgressStore(state => state.resetProgress);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // When user logs in, subscribe to their progress
        subscribeToUserProgress(user.uid);
      } else {
        // When user logs out, clear their profile and reset progress store
        setUserProfile(null);
        resetUserProgress();
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [subscribeToUserProgress, resetUserProgress]);

  useEffect(() => {
    if (user) {
      const userProfileRef = doc(db, 'user-profiles', user.uid);
      const unsubscribeProfile = onSnapshot(userProfileRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        } else {
          setUserProfile(null); 
        }
        setLoading(false);
      });

      return () => unsubscribeProfile();
    }
  }, [user]);


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
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
