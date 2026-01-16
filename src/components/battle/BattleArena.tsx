"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PlayerCard } from "./PlayerCard";
import { RoastPromptCard } from "./RoastPromptCard";
import { VoiceRecorder } from "./VoiceRecorder";
import { EmojiReactionBar } from "./EmojiReactionBar";
import { BattleResultModal } from "./BattleResultModal";
import { useSocket } from "@/hooks/useSocket";
import { BATTLE_CONFIG } from "@/config/constants";

interface BattleArenaProps {
  battleId: string | null;
  onBattleEnd: () => void;
}

export function BattleArena({ battleId, onBattleEnd }: BattleArenaProps) {
  const { publicKey } = useWallet();
  const socket = useSocket();
  
  const [round, setRound] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(BATTLE_CONFIG.ROUND_DURATION);
  const [phase, setPhase] = useState<"waiting" | "prompt" | "record" | "judging" | "result">("waiting");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentAddress, setOpponentAddress] = useState("");
  const [battleComplete, setBattleComplete] = useState(false);
  const [currentRoast, setCurrentRoast] = useState("");
  const [aiCommentary, setAiCommentary] = useState("");

  // Listen for battle events
  useEffect(() => {
    if (!socket) return;

  // If we already have a battleId (came from matchmaking), request current state
  if (battleId) {
    console.log('🎮 BattleArena mounted with existing battleId:', battleId);
    console.log('📡 Requesting current round state...');
    socket.emit('battle:request_state', { battleId });
  }

// Battle matched - already have battleId from props
socket.on('battle:matched', (data: any) => {
  console.log('🎮 Battle matched!', data);
  setOpponentAddress(data.opponent.userId);
});

    // Round start
    socket.on('battle:round_start', (data: any) => {
      console.log('🎯 Round started:', data);
      setRound(data.round);
      setCurrentPrompt(data.prompt);
      setTimeRemaining(Math.floor(data.duration / 1000));
      setPhase("record");
    });

    // Opponent submitted roast
    socket.on('battle:opponent_roast', (data: any) => {
      console.log('👊 Opponent roasted:', data);
    });

    // Round scored
    socket.on('battle:round_scored', (data: any) => {
      console.log('📊 Round scored:', data);
      setMyScore((prev) => prev + data.yourScore);
      setOpponentScore((prev) => prev + data.opponentScore);
      setAiCommentary(data.commentary || "");
      setPhase("judging");
      
      // Show results for 5 seconds before next round
      setTimeout(() => {
        if (data.round < 3) {
          setPhase("prompt");
        }
      }, 5000);
    });

    // Battle ended
    socket.on('battle:ended', (data: any) => {
      console.log('🏆 Battle ended:', data);
      setBattleComplete(true);
    });

    // Opponent disconnected
    socket.on('battle:opponent_disconnected', () => {
      console.log('❌ Opponent disconnected');
      alert('Your opponent disconnected. Returning to home.');
      onBattleEnd();
    });

    return () => {
      socket.off('battle:matched');
      socket.off('battle:round_start');
      socket.off('battle:opponent_roast');
      socket.off('battle:round_scored');
      socket.off('battle:ended');
      socket.off('battle:opponent_disconnected');
    };
  }, [socket, onBattleEnd]);

  // Timer countdown
  useEffect(() => {
    if (phase !== "record") return;

    const timer = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const handleRoastSubmit = (roastText?: string) => {
    if (!socket || !battleId) return;

    const roast = roastText || currentRoast;
    
    console.log('📤 Submitting roast:', roast);
    
    socket.emit('battle:submit_roast', {
      battleId,
      round,
      roast,
      mode: 'text'
    });

    setCurrentRoast("");
    setPhase("judging");
  };

  const handleReaction = (emoji: string) => {
    if (!socket || !battleId) return;
    socket.emit('battle:emoji_reaction', { battleId, emoji });
  };

  if (battleComplete) {
    const won = myScore > opponentScore;
    return (
      <BattleResultModal
        won={won}
        myScore={myScore}
        opponentScore={opponentScore}
        earnings={won ? 190 : -100}
        onClose={onBattleEnd}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-dark flex flex-col pb-20">
      {/* Top section - Timer and Round */}
      <div className="text-center py-6 px-4">
        {phase === "waiting" ? (
          <p className="text-gray-400 text-lg">Finding opponent...</p>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-2">Round {round} of 3</p>
            <p className="font-heading text-3xl sm:text-4xl text-fire tabular-nums">
              {String(Math.floor(timeRemaining / 60)).padStart(2, "0")}:
              {String(timeRemaining % 60).padStart(2, "0")}
            </p>
          </>
        )}
      </div>

      {/* Players */}
      <div className="flex justify-center gap-8 px-4 mb-4">
        <PlayerCard
          address={publicKey?.toBase58() || "You"}
          score={myScore}
          isActive={phase === "record"}
          label="You"
        />
        <div className="flex items-center">
          <span className="font-heading text-2xl text-fire">VS</span>
        </div>
        <PlayerCard
          address={opponentAddress || "Opponent"}
          score={opponentScore}
          isActive={false}
          label="Opponent"
        />
      </div>

      {/* Battle content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto pb-4">
        {phase === "waiting" && (
          <div className="text-center">
            <div className="animate-pulse text-fire text-6xl mb-4">🔥</div>
            <p className="text-xl text-gray-400">Searching for worthy opponent...</p>
          </div>
        )}

        {phase === "prompt" && (
          <RoastPromptCard
            prompt={currentPrompt}
            onReady={() => setPhase("record")}
          />
        )}

        {phase === "record" && (
          <VoiceRecorder
            maxDuration={timeRemaining}
            onSubmit={handleRoastSubmit}
          />
        )}

        {phase === "judging" && (
          <div className="text-center space-y-4">
            <p className="font-heading text-2xl mb-2">AI Judge is scoring...</p>
            <div className="animate-pulse text-fire text-6xl">🔥</div>
            {aiCommentary && (
              <div className="bg-fire/10 rounded-xl p-4 border border-fire/30 max-w-md">
                <p className="text-sm italic text-gray-300">"{aiCommentary}"</p>
                <p className="text-xs text-gray-500 mt-2">- AI Judge</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reaction bar */}
      <EmojiReactionBar onReact={handleReaction} />
    </div>
  );
}