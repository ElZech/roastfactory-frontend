"use client";

import { REACTION_EMOJIS } from "@/config/constants";

interface EmojiReactionBarProps {
  onReact: (emoji: string) => void;
}

export function EmojiReactionBar({ onReact }: EmojiReactionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-lighter border-t border-dark-navy p-4">
      <div className="flex justify-center gap-4">
        {REACTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onReact(emoji)}
            className="text-3xl hover:scale-125 active:scale-90 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
