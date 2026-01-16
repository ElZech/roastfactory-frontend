"use client";

import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRoast, truncateAddress } from "@/lib/utils";

const mockLeaders = [
  { rank: 1, address: "FxK3rH7gQzM4vN8pW2kS5yD9aE1cB6jL", wins: 47, earnings: 15420 },
  { rank: 2, address: "Ax7f9pQ2nL8mK3wR6hT4yU1vC5bN0jD", wins: 42, earnings: 12890 },
  { rank: 3, address: "Bz9k2sR4mP7nL1wQ8hY3uI6vC0jN5dF", wins: 38, earnings: 11200 },
];

const rankColors = {
  1: "text-yellow-500",
  2: "text-gray-300",
  3: "text-orange-400",
};

export function LeaderboardPreview() {
  return (
    <div className="space-y-2">
      {mockLeaders.map((leader) => (
        <div
          key={leader.rank}
          className="bg-dark-lighter rounded-xl p-3 flex items-center gap-3"
        >
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full font-bold",
              leader.rank === 1 && "bg-yellow-500/20",
              leader.rank === 2 && "bg-gray-300/20",
              leader.rank === 3 && "bg-orange-400/20"
            )}
          >
            {leader.rank === 1 ? (
              <Trophy className={cn("w-5 h-5", rankColors[1])} />
            ) : (
              <span className={rankColors[leader.rank as keyof typeof rankColors]}>
                #{leader.rank}
              </span>
            )}
          </div>

          <div className="flex-1">
            <p className="font-medium">{truncateAddress(leader.address)}</p>
            <p className="text-xs text-gray-500">{leader.wins} wins</p>
          </div>

          <div className="text-right">
            <p className="font-bold text-fire">{formatRoast(leader.earnings)}</p>
            <p className="text-xs text-gray-500">ROAST</p>
          </div>
        </div>
      ))}
    </div>
  );
}
