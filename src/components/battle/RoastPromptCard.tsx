"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface RoastPromptCardProps {
  prompt: string;
  onReady: () => void;
}

export function RoastPromptCard({ prompt, onReady }: RoastPromptCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Reveal animation
    const revealTimer = setTimeout(() => setRevealed(true), 500);

    // Auto-start countdown after reveal
    const countdownTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval);
            onReady();
            return 0;
          }
          return c - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, 1500);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(countdownTimer);
    };
  }, [onReady]);

  return (
    <div className="w-full max-w-md space-y-6 text-center animate-scale-in">
      <p className="text-gray-400 uppercase tracking-wide text-sm">Your Prompt</p>

      <div className="bg-gradient-to-br from-dark-lighter to-dark-navy rounded-2xl p-6 border border-fire/30">
        <p
          className={`font-heading text-2xl uppercase transition-all duration-500 ${
            revealed ? "opacity-100 blur-0" : "opacity-0 blur-lg"
          }`}
        >
          {prompt}
        </p>
      </div>

      {revealed && countdown > 0 && (
        <div className="space-y-2">
          <p className="text-gray-400">Starting in</p>
          <p className="font-heading text-6xl text-fire animate-pulse">
            {countdown}
          </p>
        </div>
      )}

      {!revealed && (
        <div className="animate-pulse text-gray-500">
          Revealing prompt...
        </div>
      )}
    </div>
  );
}
