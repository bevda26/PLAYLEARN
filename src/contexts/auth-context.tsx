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
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Combine all loading states into one
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isPersistenceLoading, setIsPersistenceLoading] = useState(true);

  const subscribeToUserProgress = useUserProgressStore(state => state.subscribeToUserProgress);
  const resetUserProgress = useUserProgressStore(state => state.resetProgress);

  useEffect(() => {
    // Wait for persistence to be enabled before doing anything else
    persistenceEnabled.then(() => {
      setIsPersistenceLoading(false);
    });

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthLoading(false);
      if (user) {
        const adminId = process.env.NEXT_PUBLIC_ADMIN_USER_ID;
        setIsAdmin(!!adminId && user.uid === adminId);
        subscribeToUserProgress(user.uid);
      } else {
        setUserProfile(null);
        setIsAdmin(false);
        resetUserProgress();
        setIsProfileLoading(false); // No profile to load if no user
      }
    });

    return () => unsubscribeAuth();
  }, [subscribeToUserProgress, resetUserProgress]);

  useEffect(() => {
    if (!user || isPersistenceLoading) {
      // Don't fetch profile if no user or if persistence isn't ready
      if (!user) setIsProfileLoading(false);
      return;
    }

    setIsProfileLoading(true);

    const userProfileRef = doc(db, 'user-profiles', user.uid);
    const unsubscribeProfile = onSnapshot(userProfileRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      } else {
        setUserProfile(null); 
      }
      setIsProfileLoading(false); 
    }, (error) => {
        console.error("Error fetching user profile:", error);
        setIsProfileLoading(false);
    });

    return () => unsubscribeProfile();
  }, [user, isPersistenceLoading]);

  useEffect(() => {
    // The overall loading state is true if any of the individual states are true
    setLoading(isAuthLoading || isProfileLoading || isPersistenceLoading);
  }, [isAuthLoading, isProfileLoading, isPersistenceLoading]);


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