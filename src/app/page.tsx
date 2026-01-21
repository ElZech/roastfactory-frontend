"use client";

import { QuickMatchButton } from "@/components/battle/QuickMatchButton";
import { LeaderboardPreview } from "@/components/shared/LeaderboardPreview";
import { TrendingClips } from "@/components/shared/TrendingClips";
import { Flame, Trophy, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="font-heading text-5xl md:text-6xl text-fire uppercase tracking-tight">
          ROAST FACTORY
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Battle your wit. Win ROAST tokens. Go viral.
        </p>
      </section>

      {/* Quick Match CTA */}
      <section className="flex justify-center">
        <QuickMatchButton />
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-dark-lighter rounded-xl p-4 text-center">
          <Flame className="w-6 h-6 text-fire mx-auto mb-2" />
          <p className="text-2xl font-bold">1,247</p>
          <p className="text-xs text-gray-500">Live Battles</p>
        </div>
        <div className="bg-dark-lighter rounded-xl p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">50K</p>
          <p className="text-xs text-gray-500">ROAST Won Today</p>
        </div>
        <div className="bg-dark-lighter rounded-xl p-4 text-center">
          <Zap className="w-6 h-6 text-neon-blue mx-auto mb-2" />
          <p className="text-2xl font-bold">892</p>
          <p className="text-xs text-gray-500">Clips Shared</p>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl uppercase">Daily Leaders</h2>
          <a href="/leaderboard" className="text-fire text-sm hover:underline">
            View All
          </a>
        </div>
        <LeaderboardPreview />
      </section>

      {/* Trending Clips */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl uppercase">Trending Clips</h2>
          <a href="/clips" className="text-fire text-sm hover:underline">
            View All
          </a>
        </div>
        <TrendingClips />
      </section>
    </div>
  );
}
