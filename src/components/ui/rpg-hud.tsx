'use client';

import { Heart, Zap, Star, Crown, Backpack, Map, Settings } from "lucide-react";
import { useUserProgressStore } from "@/stores/user-progress-store";
import { useAuth } from "@/contexts/auth-context";

export function RPGHud() {
  const { health, xp, level, xpToNextLevel, inventory } = useUserProgressStore();
  const { userProfile } = useAuth();
  
  const xpPercentage = (xp / xpToNextLevel) * 100;
  const inventoryCount = Object.values(inventory).reduce((sum, q) => sum + q, 0);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      {/* TODO: Add ambient sound effects for HUD interactions (e.g., button clicks, item pick-up) */}
      <div className="max-w-7xl mx-auto">
        
        {/* Top HUD Bar */}
        <div className="bg-black/80 border-2 border-yellow-400/50 rounded-xl backdrop-blur-md p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            
            {/* Left Side - Character Info */}
            <div className="flex items-center gap-6">
              
              {/* Character Avatar */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-yellow-400 overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
                  {userProfile?.avatar ? (
                    <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <Crown className="w-full h-full p-2 text-yellow-400" />
                  )}
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {level}
                </div>
              </div>

              {/* Health Bar */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-white text-sm font-bold">Health</span>
                  <span className="text-red-400 text-sm">{health}/100</span>
                </div>
                <div className="w-32 h-3 bg-gray-700 rounded-full border border-red-500/50">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-300"
                    style={{ width: `${health}%` }}
                  />
                </div>
              </div>

              {/* XP Bar */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-white text-sm font-bold">Experience</span>
                  <span className="text-yellow-400 text-sm">{xp}/{xpToNextLevel}</span>
                </div>
                <div className="w-40 h-3 bg-gray-700 rounded-full border border-yellow-500/50">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transition-all duration-300"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-3">
              
              {/* Inventory */}
              <button className="relative bg-yellow-600/20 border border-yellow-400/50 rounded-lg p-3 hover:bg-yellow-400/30 transition-colors group">
                <Backpack className="w-5 h-5 text-yellow-400" />
                {inventoryCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {inventoryCount}
                  </div>
                )}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Inventory ({inventoryCount} items)
                </div>
              </button>

              {/* Map */}
              <button className="bg-blue-600/20 border border-blue-400/50 rounded-lg p-3 hover:bg-blue-400/30 transition-colors group">
                <Map className="w-5 h-5 text-blue-400" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  World Map
                </div>
              </button>

              {/* Settings */}
              <button className="bg-gray-600/20 border border-gray-400/50 rounded-lg p-3 hover:bg-gray-400/30 transition-colors group">
                <Settings className="w-5 h-5 text-gray-400" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Settings
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}