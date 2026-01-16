"use client";

import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRoast, truncateAddress } from "@/lib/utils";

interface LeaderboardListProps {
  period: "Daily" | "Weekly" | "All-Time";
}

const mockLeaderboard = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1,
  address: `${["FxK3", "Ax7f", "Bz9k", "Ck2m", "Dl4n"][i % 5]}rH7gQzM4vN8pW2kS5yD9aE1cB6jL`,
  username: i < 5 ? ["FireRoaster", "BurnMaster", "SavageQueen", "RoastKing", "FlameGod"][i] : null,
  wins: Math.floor(50 - i * 2 + Math.random() * 5),
  losses: Math.floor(10 + i + Math.random() * 3),
  earnings: Math.floor(15000 - i * 500 + Math.random() * 200),
}));

export function LeaderboardList({ period }: LeaderboardListProps) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-500";
    if (rank === 2) return "bg-gray-300/20 text-gray-300";
    if (rank === 3) return "bg-orange-400/20 text-orange-400";
    return "bg-dark-navy text-gray-400";
  };

  return (
    <div className="space-y-2">
      {mockLeaderboard.map((player) => (
        <div
          key={player.rank}
          className={cn(
            "bg-dark-lighter rounded-xl p-4 flex items-center gap-4",
            player.rank <= 3 && "border border-dark-navy"
          )}
        >
          {/* Rank */}
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg",
              getRankStyle(player.rank)
            )}
          >
            {player.rank <= 3 ? (
              <Trophy className="w-5 h-5" />
            ) : (
              player.rank
            )}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">
              {player.username || truncateAddress(player.address)}
            </p>
            <p className="text-sm text-gray-500">
              {player.wins}W / {player.losses}L ({Math.round((player.wins / (player.wins + player.losses)) * 100)}%)
            </p>
          </div>

          {/* Earnings */}
          <div className="text-right">
            <p className="font-bold text-fire">{formatRoast(player.earnings)}</p>
            <p className="text-xs text-gray-500">ROAST</p>
          </div>
        </div>
      ))}
    </div>
  );
}
