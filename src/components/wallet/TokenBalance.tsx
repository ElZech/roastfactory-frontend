"use client";

import { Flame } from "lucide-react";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { formatRoast } from "@/lib/utils";

export function TokenBalance() {
  const { balance, isLoading } = useTokenBalance();

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 px-3 py-1.5 bg-dark-lighter rounded-lg">
        <Flame className="w-4 h-4 text-fire animate-pulse" />
        <span className="text-sm">...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 bg-dark-lighter rounded-lg">
      <Flame className="w-4 h-4 text-fire" />
      <span className="text-sm font-medium">{formatRoast(balance)}</span>
      <span className="text-xs text-gray-500">ROAST</span>
    </div>
  );
}
