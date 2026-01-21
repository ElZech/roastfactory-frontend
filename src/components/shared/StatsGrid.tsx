"use client";
import { Trophy, Target, Flame, TrendingUp } from "lucide-react";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-dark-lighter rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Trophy className="w-4 h-4" />
          <span className="text-sm">Win Rate</span>
        </div>
        <p className="text-2xl font-bold">0%</p>
        <p className="text-xs text-gray-500">0W / 0L</p>
      </div>
      <div className="bg-dark-lighter rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Flame className="w-4 h-4 text-fire" />
          <span className="text-sm">Total Earnings</span>
        </div>
        <p className="text-2xl font-bold text-fire">0</p>
        <p className="text-xs text-gray-500">ROAST</p>
      </div>
      <div className="bg-dark-lighter rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Current Streak</span>
        </div>
        <p className="text-2xl font-bold">0</p>
        <p className="text-xs text-gray-500">Best: 0</p>
      </div>
      <div className="bg-dark-lighter rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Target className="w-4 h-4" />
          <span className="text-sm">Avg Score</span>
        </div>
        <p className="text-2xl font-bold">0</p>
        <p className="text-xs text-gray-500">per round</p>
      </div>
    </div>
  );
}