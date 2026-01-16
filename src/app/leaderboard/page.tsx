"use client";

import { useState } from "react";
import { LeaderboardList } from "@/components/shared/LeaderboardList";
import { cn } from "@/lib/utils";

const periods = ["Daily", "Weekly", "All-Time"] as const;
type Period = (typeof periods)[number];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("Daily");

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl uppercase">Leaderboard</h1>
      </div>

      {/* Period Tabs */}
      <div className="flex gap-2">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              period === p
                ? "bg-fire text-white"
                : "bg-dark-lighter text-gray-400 hover:text-white"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <LeaderboardList period={period} />
    </div>
  );
}
