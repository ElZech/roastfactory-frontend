"use client";

import { Play, Flame, Share2 } from "lucide-react";

interface ClipGridProps {
  filter: "Trending" | "Latest" | "Following";
}

const mockClips = Array.from({ length: 12 }, (_, i) => ({
  id: `clip-${i}`,
  player1: `Player${i * 2 + 1}`,
  player2: `Player${i * 2 + 2}`,
  views: Math.floor(5000 + Math.random() * 10000),
  reactions: Math.floor(200 + Math.random() * 800),
  duration: Math.floor(15 + Math.random() * 45),
}));

export function ClipGrid({ filter }: ClipGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {mockClips.map((clip) => (
        <div
          key={clip.id}
          className="relative aspect-[9/16] bg-dark-lighter rounded-xl overflow-hidden group cursor-pointer"
        >
          {/* Placeholder gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-fire/30 via-dark-navy to-neon-pink/20" />

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <div className="bg-fire rounded-full p-4 fire-glow">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          {/* Top badge */}
          <div className="absolute top-2 left-2 bg-black/60 rounded-full px-2 py-1 text-xs">
            {clip.duration}s
          </div>

          {/* Share button */}
          <button className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-fire">
            <Share2 className="w-4 h-4" />
          </button>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <p className="text-sm font-medium truncate">
              {clip.player1} vs {clip.player2}
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-fire" />
                {(clip.views / 1000).toFixed(1)}K
              </span>
              <span>{clip.reactions} reactions</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
