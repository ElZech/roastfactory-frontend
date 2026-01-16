"use client";

import { Check, X, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRoast, truncateAddress } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const mockBattles = Array.from({ length: 10 }, (_, i) => ({
  id: `battle-${i}`,
  opponent: `Bz9k2sR4mP7nL1wQ8hY3uI6vC0jN5dF${i}`,
  won: Math.random() > 0.4,
  myScore: Math.floor(70 + Math.random() * 30),
  opponentScore: Math.floor(60 + Math.random() * 35),
  earnings: Math.floor(-50 + Math.random() * 200),
  tier: ["Bronze", "Silver", "Gold", "Diamond"][Math.floor(Math.random() * 4)],
  timestamp: new Date(Date.now() - i * 3600000 * (1 + Math.random() * 5)),
  hasClip: Math.random() > 0.5,
}));

export function BattleHistory() {
  return (
    <div className="space-y-2">
      {mockBattles.map((battle) => (
        <div
          key={battle.id}
          className="bg-dark-lighter rounded-xl p-4 flex items-center gap-4"
        >
          {/* Result icon */}
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              battle.won ? "bg-green-500/20" : "bg-red-500/20"
            )}
          >
            {battle.won ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <X className="w-5 h-5 text-red-500" />
            )}
          </div>

          {/* Battle info */}
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">
              vs {truncateAddress(battle.opponent)}
            </p>
            <p className="text-sm text-gray-500">
              {battle.myScore} - {battle.opponentScore} | {battle.tier}
            </p>
            <p className="text-xs text-gray-600">
              {formatDistanceToNow(battle.timestamp, { addSuffix: true })}
            </p>
          </div>

          {/* Earnings */}
          <div className="text-right">
            <p
              className={cn(
                "font-bold",
                battle.earnings > 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {battle.earnings > 0 ? "+" : ""}
              {formatRoast(battle.earnings)}
            </p>
            <p className="text-xs text-gray-500">ROAST</p>
          </div>

          {/* Clip button */}
          {battle.hasClip && (
            <button className="p-2 bg-dark-navy rounded-lg hover:bg-fire transition-colors">
              <Video className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
