"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { TierSelector } from "@/components/battle/TierSelector";
import { MatchmakingLoader } from "@/components/battle/MatchmakingLoader";
import { BattleArena } from "@/components/battle/BattleArena";
import { WalletConnectPrompt } from "@/components/wallet/WalletConnectPrompt";
import { Button } from "@/components/ui/Button";

type BattleState = "idle" | "selecting" | "matchmaking" | "battling";

export default function BattlePage() {
  const { connected } = useWallet();
const [battleState, setBattleState] = useState<BattleState>("idle");
const [selectedTier, setSelectedTier] = useState<string | null>(null);
const [battleId, setBattleId] = useState<string | null>(null);

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-12">
        <WalletConnectPrompt
          title="Connect to Battle"
          description="Connect your wallet to enter ranked battles and compete for ROAST rewards."
        />
      </div>
    );
  }

if (battleState === "matchmaking") {
  return (
    <MatchmakingLoader
      tier={selectedTier!}
      onCancel={() => setBattleState("idle")}
      onMatchFound={(id) => {
        setBattleId(id);
        setBattleState("battling");
      }}
    />
  );
}

if (battleState === "battling") {
  return (
    <BattleArena
      battleId={battleId}
      onBattleEnd={() => {
        setBattleId(null);
        setBattleState("idle");
      }}
    />
  );
}
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-4xl uppercase text-fire">
          Enter the Arena
        </h1>
        <p className="text-gray-400">Select your tier and battle for ROAST</p>
      </div>

      <TierSelector
        selectedTier={selectedTier}
        onSelect={setSelectedTier}
      />

      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!selectedTier}
          onClick={() => setBattleState("matchmaking")}
          className="px-12"
        >
          {selectedTier ? `Enter ${selectedTier} Battle` : "Select a Tier"}
        </Button>
      </div>

      <div className="max-w-md mx-auto bg-dark-lighter rounded-xl p-4 space-y-2">
        <h3 className="font-semibold">How it works:</h3>
        <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
          <li>Select your entry tier</li>
          <li>Get matched with an opponent</li>
          <li>Deliver your best roasts in 3 rounds</li>
          <li>AI judges score savagery, creativity, and delivery</li>
          <li>Winner takes the prize pool minus 5% fee</li>
        </ol>
      </div>
    </div>
  );
}
