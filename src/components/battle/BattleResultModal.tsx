"use client";

import { Trophy, X, Share2, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatRoast } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface BattleResultModalProps {
  won: boolean;
  myScore: number;
  opponentScore: number;
  earnings: number;
  onClose: () => void;
}

export function BattleResultModal({
  won,
  myScore,
  opponentScore,
  earnings,
  onClose,
}: BattleResultModalProps) {
  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Confetti effect for wins */}
      {won && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`,
                backgroundColor: ["#FF4500", "#FFD700", "#E94560", "#00D9FF"][
                  Math.floor(Math.random() * 4)
                ],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Result card */}
      <div className="bg-dark-lighter rounded-2xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 sm:space-y-6 animate-scale-in my-4">
        {/* Trophy/Result icon */}
        <div
          className={cn(
            "w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full flex items-center justify-center",
            won ? "bg-yellow-500/20" : "bg-red-500/20"
          )}
        >
          {won ? (
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
          ) : (
            <X className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
          )}
        </div>

        {/* Result text */}
        <div>
          <h2
            className={cn(
              "font-heading text-3xl sm:text-4xl uppercase",
              won ? "text-yellow-500" : "text-red-500"
            )}
          >
            {won ? "Victory!" : "Defeat"}
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            {won ? "Your roasts were too hot to handle!" : "Better luck next time!"}
          </p>
        </div>

        {/* Score breakdown */}
        <div className="flex justify-center gap-6 sm:gap-8">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm">You</p>
            <p className="text-2xl sm:text-3xl font-bold">{myScore}</p>
          </div>
          <div className="text-gray-600 self-center">vs</div>
          <div>
            <p className="text-gray-400 text-xs sm:text-sm">Opponent</p>
            <p className="text-2xl sm:text-3xl font-bold">{opponentScore}</p>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-dark-navy rounded-xl p-3 sm:p-4">
          <p className="text-gray-400 text-xs sm:text-sm mb-1">
            {won ? "Earnings" : "Entry Lost"}
          </p>
          <p
            className={cn(
              "text-2xl sm:text-3xl font-bold",
              earnings > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {earnings > 0 ? "+" : ""}
            {formatRoast(Math.abs(earnings))} ROAST
          </p>
        </div>

        {/* AI Commentary */}
        <div className="bg-fire/10 rounded-xl p-3 sm:p-4 border border-fire/30">
          <p className="text-xs sm:text-sm italic text-gray-300">
            {won
              ? '"That burn was so hot, fire departments in three states are on alert!"'
              : '"At least your opponent\'s roasts were fire. Yours were more like a damp match."'}
          </p>
          <p className="text-xs text-gray-500 mt-2">- AI Judge</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1 gap-2 text-sm sm:text-base">
            <Video className="w-4 h-4" />
            View Clip
          </Button>
          <Button className="flex-1 gap-2 text-sm sm:text-base">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Return Home button */}
        <Button variant="ghost" onClick={onClose} className="w-full text-sm sm:text-base mt-2">
          Return Home
        </Button>
      </div>
    </div>
  );
}