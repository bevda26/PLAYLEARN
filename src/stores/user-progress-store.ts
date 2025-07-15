import { create } from 'zustand';

interface UserProgressState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  health: number;
  setHealth: (health: number) => void;
  addXp: (amount: number) => void;
  resetProgress: () => void;
}

const LEVEL_XP_MAP = [100, 250, 500, 1000, 2000]; // XP needed to reach next level

const calculateLevel = (totalXp: number) => {
  let level = 1;
  let xpForNext = LEVEL_XP_MAP[0];
  let accumulatedXp = 0;

  for (let i = 0; i < LEVEL_XP_MAP.length; i++) {
    if (totalXp >= accumulatedXp + LEVEL_XP_MAP[i]) {
      level++;
      accumulatedXp += LEVEL_XP_MAP[i];
    } else {
      break;
    }
  }
  return { level, accumulatedXp };
};


export const useUserProgressStore = create<UserProgressState>((set, get) => ({
  level: 1,
  xp: 0,
  xpToNextLevel: LEVEL_XP_MAP[0],
  health: 100,

  setHealth: (health) => set({ health }),

  addXp: (amount) => {
    const currentTotalXp = get().xp + (get().level > 1 ? LEVEL_XP_MAP.slice(0, get().level - 1).reduce((a, b) => a + b, 0) : 0);
    const newTotalXp = currentTotalXp + amount;
    
    const { level: newLevel, accumulatedXp } = calculateLevel(newTotalXp);
    const xpInCurrentLevel = newTotalXp - accumulatedXp;
    const xpToNextLevel = LEVEL_XP_MAP[newLevel - 1] || Infinity;

    set({
      level: newLevel,
      xp: xpInCurrentLevel,
      xpToNextLevel: xpToNextLevel,
    });
  },
  
  resetProgress: () => set({
    level: 1,
    xp: 0,
    xpToNextLevel: LEVEL_XP_MAP[0],
    health: 100
  }),
}));
