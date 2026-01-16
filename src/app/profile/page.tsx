"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { StatsGrid } from "@/components/shared/StatsGrid";
import { BattleHistory } from "@/components/shared/BattleHistory";
import { WalletPanel } from "@/components/wallet/WalletPanel";
import { WalletConnectPrompt } from "@/components/wallet/WalletConnectPrompt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function ProfilePage() {
  const { connected, publicKey } = useWallet();

  if (!connected || !publicKey) {
    return (
      <div className="container mx-auto px-4 py-12">
        <WalletConnectPrompt
          title="View Your Profile"
          description="Connect your wallet to see your stats, battle history, and earnings."
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <ProfileHeader address={publicKey.toBase58()} />

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="battles">Battles</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="mt-4">
          <StatsGrid />
        </TabsContent>

        <TabsContent value="battles" className="mt-4">
          <BattleHistory />
        </TabsContent>

        <TabsContent value="wallet" className="mt-4">
          <WalletPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
