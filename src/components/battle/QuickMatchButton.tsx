"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuickMatchButton() {
  const router = useRouter();
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!connected) {
      setVisible(true);
    } else {
      router.push("/battle");
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative px-12 py-5 rounded-2xl font-heading text-2xl uppercase",
        "bg-gradient-to-r from-fire via-fire-light to-fire-ember",
        "text-white shadow-lg transition-all duration-300",
        "hover:scale-105 hover:shadow-2xl",
        "fire-glow"
      )}
    >
      <span className="flex items-center gap-3">
        <Flame
          className={cn(
            "w-7 h-7 transition-transform",
            isHovered && "animate-pulse"
          )}
        />
        Battle Now
        <Flame
          className={cn(
            "w-7 h-7 transition-transform",
            isHovered && "animate-pulse"
          )}
        />
      </span>

      {/* Animated ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl border-2 border-fire/50 transition-transform",
          isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
        )}
        style={{ transitionDuration: "1s" }}
      />
    </button>
  );
}
