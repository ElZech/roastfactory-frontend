"use client";
import { Video } from "lucide-react";

export function TrendingClips() {
  return (
    <div className="bg-dark-lighter rounded-xl p-6 text-center">
      <Video className="w-10 h-10 text-gray-600 mx-auto mb-3" />
      <p className="text-gray-400 font-medium">Clips coming soon</p>
      <p className="text-xs text-gray-500 mt-1">Epic roast moments will appear here!</p>
    </div>
  );
}
