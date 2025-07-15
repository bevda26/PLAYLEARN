'use client';

import { Heart, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUserProgressStore } from "@/stores/user-progress-store";

export function RPGInterface() {
  const { health, xp, level, xpToNextLevel } = useUserProgressStore();
  const xpPercentage = (xp / xpToNextLevel) * 100;

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
            <span className="text-sm font-mono text-dragon-red/90">{health} / 100</span>
          </div>
          <Progress value={health} className="h-3 [&>div]:bg-dragon-red" />
        </div>
        
        {/* XP Bar */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-mystic-gold" />
                <span className="font-bold text-parchment-white">XP (Level {level})</span>
            </div>
            <span className="text-sm font-mono text-mystic-gold/90">{xp} / {xpToNextLevel}</span>
          </div>
          <Progress value={xpPercentage} className="h-3 [&>div]:bg-mystic-gold" />
        </div>
      </div>
    </div>
  );
}
