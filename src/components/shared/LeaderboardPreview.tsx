"use client";
import { Trophy } from "lucide-react";

export function LeaderboardPreview() {
  return (
    <div className="bg-dark-lighter rounded-xl p-6 text-center">
      <Trophy className="w-10 h-10 text-gray-600 mx-auto mb-3" />
      <p className="text-gray-400 font-medium">No battles yet</p>
      <p className="text-xs text-gray-500 mt-1">Be the first to claim the top spot!</p>
    </div>
  );
}