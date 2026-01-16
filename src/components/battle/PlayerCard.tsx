"use client";

import { truncateAddress } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  address: string;
  score: number;
  isActive: boolean;
  label: string;
}

export function PlayerCard({ address, score, isActive, label }: PlayerCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-4 rounded-xl transition-all duration-300",
        isActive && "bg-fire/20 ring-2 ring-fire"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center text-xl font-bold mb-2",
          label === "You"
            ? "from-fire to-fire-ember"
            : "from-neon-blue to-neon-pink"
        )}
      >
        {address.slice(0, 2)}
      </div>

      {/* Name */}
      <p className="font-medium text-sm">
        {label === "You" ? "You" : truncateAddress(address)}
      </p>

      {/* Score */}
      <p className="text-2xl font-bold text-fire">{score}</p>
      <p className="text-xs text-gray-500">points</p>

      {/* Speaking indicator */}
      {isActive && (
        <div className="mt-2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-4 bg-fire rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
