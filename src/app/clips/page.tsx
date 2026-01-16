"use client";

import { useState } from "react";
import { ClipGrid } from "@/components/shared/ClipGrid";
import { cn } from "@/lib/utils";

const filters = ["Trending", "Latest", "Following"] as const;
type Filter = (typeof filters)[number];

export default function ClipsPage() {
  const [filter, setFilter] = useState<Filter>("Trending");

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl uppercase">Clips</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === f
                ? "bg-fire text-white"
                : "bg-dark-lighter text-gray-400 hover:text-white"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Clip Grid */}
      <ClipGrid filter={filter} />
    </div>
  );
}
