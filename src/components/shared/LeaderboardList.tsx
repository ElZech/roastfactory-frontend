"use client";
import { Trophy } from "lucide-react";

interface LeaderboardListProps {
  period: "Daily" | "Weekly" | "All-Time";
}

export function LeaderboardList({ period }: LeaderboardListProps) {
  return (
    <div className="bg-dark-lighter rounded-xl p-8 text-center">
      <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <p className="text-gray-400 font-medium text-lg">No rankings yet</p>
      <p className="text-sm text-gray-500 mt-2">
        Be the first to battle and claim the #{1} spot!
      </p>
      <p className="text-xs text-gray-600 mt-4">
        {period} leaderboard updates after each battle
      </p>
    </div>
  );
}