"use client";

import { useEffect, useState } from "react";
import { Flame, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSocket } from "@/hooks/useSocket";
import { useWallet } from "@solana/wallet-adapter-react";

interface MatchmakingLoaderProps {
  tier: string;
  onCancel: () => void;
  onMatchFound: (battleId: string) => void;
}

export function MatchmakingLoader({
  tier,
  onCancel,
  onMatchFound,
}: MatchmakingLoaderProps) {
  const socket = useSocket();
  const { publicKey } = useWallet();
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<"searching" | "found" | "starting">("searching");

  useEffect(() => {
    if (!socket || !publicKey) return;

    console.log('🎯 Joining matchmaking queue...');
    console.log('Tier:', tier);
    console.log('Socket ID:', socket.id);
    console.log('User ID:', publicKey.toBase58());

    // Join the matchmaking queue
    socket.emit('battle:join_queue', {
      userId: publicKey.toBase58(),
      tier: tier,
      mode: 'text' // Default to text for now
    });

    // Listen for match found
socket.on('battle:matched', (data) => {
  console.log('✅ Match found!', data);
  setStatus("found");
  
  setTimeout(() => {
    setStatus("starting");
    setTimeout(() => {
      onMatchFound(data.battleId); // Pass battle ID!
    }, 2000);
  }, 1500);
});
    // Timer
    const interval = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    // Cleanup
    return () => {
      console.log('🚪 Leaving matchmaking queue');
      socket.emit('battle:leave_queue');
      socket.off('battle:matched');
      clearInterval(interval);
    };
  }, [socket, publicKey, tier, onMatchFound]);

  const handleCancel = () => {
    if (socket) {
      socket.emit('battle:leave_queue');
    }
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-dark flex flex-col items-center justify-center z-50">
      {/* Cancel button */}
      <button
        onClick={handleCancel}
        className="absolute top-4 right-4 p-2 bg-dark-lighter rounded-full hover:bg-dark-navy transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Fire animation */}
      <div className="relative w-32 h-32 mb-8">
        <Flame className="w-full h-full text-fire animate-pulse" />
        <div className="absolute inset-0 animate-ping">
          <Flame className="w-full h-full text-fire-light opacity-30" />
        </div>
      </div>

      {/* Status text */}
      <h2 className="font-heading text-3xl uppercase mb-2">
        {status === "searching" && "Finding Opponent..."}
        {status === "found" && "Match Found!"}
        {status === "starting" && "Get Ready!"}
      </h2>
      <p className="text-gray-400 mb-4">{tier} Tier Battle</p>

      {/* Timer */}
      {status === "searching" && (
        <p className="text-gray-500 text-sm">
          Searching for {elapsed}s...
        </p>
      )}

      {/* Starting countdown */}
      {status === "starting" && (
        <div className="font-heading text-6xl text-fire animate-pulse">
          3... 2... 1...
        </div>
      )}

      {/* Cancel button */}
      {status === "searching" && (
        <Button variant="ghost" onClick={handleCancel} className="mt-8">
          Cancel
        </Button>
      )}
    </div>
  );
}