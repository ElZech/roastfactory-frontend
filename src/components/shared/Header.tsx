"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Flame } from "lucide-react";
import { TokenBalance } from "@/components/wallet/TokenBalance";

export function Header() {
  const { connected } = useWallet();

  return (
    <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-dark-navy">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-fire" />
          <span className="font-heading text-xl text-fire uppercase">
            RoastPush
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {connected && <TokenBalance />}
          <WalletMultiButton className="!bg-fire !rounded-lg !h-9 !text-sm" />
        </div>
      </div>
    </header>
  );
}
