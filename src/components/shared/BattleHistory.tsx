"use client";
import { Swords } from "lucide-react";

export function BattleHistory() {
  return (
    <div className="bg-dark-lighter rounded-xl p-8 text-center">
      <Swords className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <p className="text-gray-400 font-medium text-lg">No battles yet</p>
      <p className="text-sm text-gray-500 mt-2">
        Your battle history will appear here after your first roast!
      </p>
    </div>
  );
}