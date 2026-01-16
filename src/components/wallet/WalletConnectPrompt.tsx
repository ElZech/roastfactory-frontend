"use client";

import { Wallet } from "lucide-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/Button";

interface WalletConnectPromptProps {
  title: string;
  description: string;
}

export function WalletConnectPrompt({ title, description }: WalletConnectPromptProps) {
  const { setVisible } = useWalletModal();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-20 h-20 bg-fire/20 rounded-full flex items-center justify-center mb-6">
        <Wallet className="w-10 h-10 text-fire" />
      </div>

      <h2 className="font-heading text-2xl uppercase mb-2">{title}</h2>
      <p className="text-gray-400 max-w-sm mb-6">{description}</p>

      <Button onClick={() => setVisible(true)} size="lg">
        Connect Wallet
      </Button>

      <p className="text-xs text-gray-600 mt-4">
        We support Phantom, Solflare, and other Solana wallets
      </p>
    </div>
  );
}
