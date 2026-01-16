"use client";

import { BATTLE_TIERS, type BattleTier } from "@/config/constants";
import { cn } from "@/lib/utils";
import { useTokenBalance } from "@/hooks/useTokenBalance";

interface TierSelectorProps {
  selectedTier: string | null;
  onSelect: (tier: string) => void;
}

export function TierSelector({ selectedTier, onSelect }: TierSelectorProps) {
  const { balance } = useTokenBalance();

  return (
    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      {(Object.keys(BATTLE_TIERS) as BattleTier[]).map((tier) => {
        const { entry, color } = BATTLE_TIERS[tier];
        const canAfford = true; // Testing mode - bypass balance check
        const isSelected = selectedTier === tier;

        return (
          <button
            key={tier}
            onClick={() => canAfford && onSelect(tier)}
            disabled={!canAfford}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all duration-200",
              "flex flex-col items-center gap-2",
              isSelected
                ? "border-fire bg-fire/10 scale-105"
                : "border-dark-navy bg-dark-lighter hover:border-gray-600",
              !canAfford && "opacity-50 cursor-not-allowed"
            )}
          >
            {/* Tier name */}
            <span
              className="font-heading text-xl uppercase"
              style={{ color }}
            >
              {tier}
            </span>

            {/* Entry fee */}
            <div className="text-center">
              <span className="text-2xl font-bold">{entry}</span>
              <span className="text-sm text-gray-400 ml-1">ROAST</span>
            </div>

            {/* Prize pool indicator */}
            <p className="text-xs text-gray-500">
              Win up to {entry * 2 * 0.95} ROAST
            </p>

            {/* Not enough balance warning */}
            {!canAfford && (
              <p className="text-xs text-red-400">Insufficient balance</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
