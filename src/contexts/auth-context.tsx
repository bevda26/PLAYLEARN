
// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db, persistenceEnabled } from '@/lib/firebase';
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

// --- MOCK DATA FOR ADMIN ACCESS ---
const MOCK_ADMIN_USER = {
  uid: 'admin-dev-user',
  email: 'admin@playlearn.dev',
  displayName: 'Admin User',
  photoURL: `https://api.dicebear.com/8.x/adventurer/svg?seed=Admin`,
} as User;

const MOCK_ADMIN_PROFILE: UserProfile = {
  userId: 'admin-dev-user',
  email: 'admin@playlearn.dev',
  displayName: 'Admin Developer',
  avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=Admin`,
  title: 'Master Builder',
  unlockedAchievements: {},
  createdAt: Timestamp.now(),
  attributes: {
    intellect: 10,
    luck: 10,
  },
  skillPoints: 99,
  guildId: 'guild-of-builders',
};
// --- END MOCK DATA ---


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const subscribeToUserProgress = useUserProgressStore(state => state.subscribeToUserProgress);

  // Temporarily set user to mock admin data to bypass login
  const user = MOCK_ADMIN_USER;
  const userProfile = MOCK_ADMIN_PROFILE;
  const isAdmin = true;
  const loading = false; // Set loading to false as we are not fetching real data

  // Still subscribe to user progress to make the dashboard work
  useEffect(() => {
    if (user) {
      subscribeToUserProgress(user.uid);
    }
  }, [user, subscribeToUserProgress]);
  

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
