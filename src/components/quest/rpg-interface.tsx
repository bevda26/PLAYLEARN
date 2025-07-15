'use client';

import { Heart, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// In a real app, these values would come from user state
const MOCK_PROGRESS = {
  health: 80,
  xp: 45,
  level: 5,
  xpToNextLevel: 100,
};

export function RPGInterface() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
      <div className="bg-shadow-black/70 backdrop-blur-md border-2 border-primary/50 rounded-xl p-4 shadow-2xl shadow-primary/20 flex items-center gap-6">
        {/* Health Bar */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-dragon-red" />
              <span className="font-bold text-parchment-white">Health</span>
            </div>
            <span className="text-sm font-mono text-dragon-red/90">{MOCK_PROGRESS.health} / 100</span>
          </div>
          <Progress value={MOCK_PROGRESS.health} className="h-3 [&>div]:bg-dragon-red" />
        </div>
        
        {/* XP Bar */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-mystic-gold" />
                <span className="font-bold text-parchment-white">XP (Level {MOCK_PROGRESS.level})</span>
            </div>
            <span className="text-sm font-mono text-mystic-gold/90">{MOCK_PROGRESS.xp} / {MOCK_PROGRESS.xpToNextLevel}</span>
          </div>
          <Progress value={(MOCK_PROGRESS.xp / MOCK_PROGRESS.xpToNextLevel) * 100} className="h-3 [&>div]:bg-mystic-gold" />
        </div>
      </div>
    </div>
  );
}
