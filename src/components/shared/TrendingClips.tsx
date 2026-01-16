"use client";

import { Play, Flame } from "lucide-react";

const mockClips = [
  { id: "1", thumbnail: "/clip1.jpg", views: 12400, reactions: 892 },
  { id: "2", thumbnail: "/clip2.jpg", views: 8900, reactions: 654 },
  { id: "3", thumbnail: "/clip3.jpg", views: 7200, reactions: 521 },
];

export function TrendingClips() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
      {mockClips.map((clip) => (
        <div
          key={clip.id}
          className="relative flex-shrink-0 w-32 aspect-[9/16] bg-dark-lighter rounded-xl overflow-hidden group cursor-pointer"
        >
          {/* Placeholder for thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-br from-fire/20 to-dark-navy" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-fire/80 rounded-full p-3">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>

          {/* Stats overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-1 text-xs">
              <Flame className="w-3 h-3 text-fire" />
              <span>{(clip.views / 1000).toFixed(1)}K</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
