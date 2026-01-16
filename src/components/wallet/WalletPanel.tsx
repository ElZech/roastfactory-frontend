"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { formatRoast, truncateAddress } from "@/lib/utils";

export function WalletPanel() {
  const { publicKey } = useWallet();
  const { balance, isLoading } = useTokenBalance();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!publicKey) return;
    await navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!publicKey) return null;

  const address = publicKey.toBase58();

  return (
    <div className="space-y-4">
      {/* Wallet Address */}
      <div className="bg-dark-lighter rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
        <div className="flex items-center gap-2">
          <p className="font-mono text-sm flex-1">{truncateAddress(address, 8)}</p>
          <button
            onClick={copyAddress}
            className="p-2 hover:bg-dark-navy rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <a
            href={`https://solscan.io/account/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-dark-navy rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ROAST Balance */}
      <div className="bg-dark-lighter rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-2">ROAST Balance</p>
        <p className="text-3xl font-bold text-fire">
          {isLoading ? "..." : formatRoast(balance)}
        </p>
        <p className="text-sm text-gray-500">Available for battles and tips</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" className="gap-2">
          <ArrowDownLeft className="w-4 h-4" />
          Deposit
        </Button>
        <Button variant="secondary" className="gap-2">
          <ArrowUpRight className="w-4 h-4" />
          Withdraw
        </Button>
      </div>

      {/* Transaction History Link */}
      <a
        href={`https://solscan.io/account/${address}#splTransfer`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-sm text-fire hover:underline"
      >
        View transaction history on Solscan
      </a>
    </div>
  );
}
