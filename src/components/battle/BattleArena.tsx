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
 const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [phase, setPhase] = useState<"waiting" | "prompt" | "record" | "judging" | "result">("waiting");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [battleEarnings, setBattleEarnings] = useState(0);
  const [battleResult, setBattleResult] = useState<'win' | 'lose'>('lose');
  const [opponentAddress, setOpponentAddress] = useState("");
  const [battleComplete, setBattleComplete] = useState(false);
  const [currentRoast, setCurrentRoast] = useState("");
  const [aiCommentary, setAiCommentary] = useState("");
  const [allRoasts, setAllRoasts] = useState<{
    player1: string[];
    player2: string[];
  }>({ player1: [], player2: [] });
  const [roundScores, setRoundScores] = useState<{
    player1: number[];
    player2: number[];
  }>({ player1: [], player2: [] });
  const [showReveal, setShowReveal] = useState(false);

  // Listen for battle events
  useEffect(() => {
    if (!socket) return;

    if (battleId) {
      console.log('🎮 BattleArena mounted with existing battleId:', battleId);
      console.log('📡 Requesting current round state...');
      socket.emit('battle:request_state', { battleId });
    }

    socket.on('battle:matched', (data: any) => {
      console.log('🎮 Battle matched!', data);
      setOpponentAddress(data.opponent.userId);
    });

    socket.on('battle:round_start', (data: any) => {
      console.log('🎯 Round started:', data);
      setRound(data.round);
      setCurrentPrompt(data.prompt);
      setTimeRemaining(Math.floor(data.duration / 1000));
      setPhase("record");
    });

    socket.on('battle:opponent_roast', (data: any) => {
      console.log('👊 Opponent roasted:', data);
      setAllRoasts(prev => ({
        ...prev,
        player2: [...prev.player2, data.roast]
      }));
    });

    socket.on('battle:round_scored', (data: any) => {
      console.log('📊 Round scored:', data);
      setMyScore((prev) => prev + data.yourScore);
      setOpponentScore((prev) => prev + data.opponentScore);
      setAiCommentary(data.commentary || "");
      
      setRoundScores(prev => ({
        player1: [...prev.player1, data.yourScore],
        player2: [...prev.player2, data.opponentScore]
      }));
      
      setPhase("judging");
      
      setTimeout(() => {
        if (data.round < 3) {
          setPhase("prompt");
        }
      }, 5000);
    });

    socket.on('battle:ended', (data: any) => {
      console.log('🏆 Battle ended:', data);
      
      setMyScore(data.yourScore);
      setOpponentScore(data.opponentScore);
      setBattleEarnings(data.earnings);
      setBattleResult(data.result);
      setShowReveal(true);
    });

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
    
    setAllRoasts(prev => ({
      ...prev,
      player1: [...prev.player1, roast]
    }));
    
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

  // ==================== REVEAL SCREEN ====================
  if (showReveal && !battleComplete) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark flex flex-col pt-8 pb-32 px-6 overflow-y-auto">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-fire/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎬</div>
            <h1 className="font-heading text-4xl text-fire mb-2">ROAST REVEAL</h1>
            <p className="text-gray-400 text-lg">All the bars. All the damage. 💀</p>
          </div>

          {/* VS Banner */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-transparent to-fire"></div>
            <span className="font-heading text-3xl text-fire animate-pulse">⚔️ VS ⚔️</span>
            <div className="h-1 flex-1 max-w-32 bg-gradient-to-l from-transparent to-fire"></div>
          </div>

          {/* Winner announcement - NOW RIGHT UNDER VS */}
          <div className="text-center mb-6">
            <div className={`inline-block px-6 py-3 rounded-2xl ${battleResult === 'win' ? 'bg-gradient-to-r from-fire/30 to-orange-500/30 border-2 border-fire' : 'bg-gradient-to-r from-gray-600/30 to-gray-700/30 border-2 border-gray-500'}`}>
              <p className="text-3xl mb-1">{battleResult === 'win' ? '🏆' : '😤'}</p>
              <p className={`font-heading text-2xl ${battleResult === 'win' ? 'text-fire' : 'text-gray-400'}`}>
                {battleResult === 'win' ? 'VICTORY!' : 'DEFEAT'}
              </p>
            </div>
          </div>

          {/* Player Cards */}
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full">
            {/* Player 1 (You) */}
            <div className="flex-1 bg-gradient-to-b from-fire/20 to-dark-lighter rounded-2xl p-5 border-2 border-fire/50 shadow-lg shadow-fire/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-fire to-orange-600 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-fire/30">
                  <span className="text-2xl">🔥</span>
                </div>
                <p className="font-heading text-xl text-fire">YOU</p>
                <p className="text-xs text-gray-500 truncate">{publicKey?.toBase58()?.slice(0, 8)}...</p>
                <div className="mt-3 bg-dark/50 rounded-xl py-2 px-4 inline-block">
                  <p className="font-heading text-4xl text-fire">{myScore}</p>
                  <p className="text-xs text-gray-400">Total Score</p>
                </div>
              </div>
              <div className="space-y-4">
                {allRoasts.player1.map((roast, idx) => (
                  <div key={idx} className="bg-dark/70 p-4 rounded-xl border border-fire/20 hover:border-fire/50 transition">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-fire">ROUND {idx + 1}</span>
                      <span className="text-xs bg-fire/20 text-fire px-2 py-1 rounded-full">+{roundScores.player1[idx] || 0} pts</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed">"{roast}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Player 2 (Opponent) */}
            <div className="flex-1 bg-gradient-to-b from-gray-700/20 to-dark-lighter rounded-2xl p-5 border-2 border-gray-600/50 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">💀</span>
                </div>
                <p className="font-heading text-xl text-gray-300">OPPONENT</p>
                <p className="text-xs text-gray-500 truncate">{opponentAddress?.slice(0, 8)}...</p>
                <div className="mt-3 bg-dark/50 rounded-xl py-2 px-4 inline-block">
                  <p className="font-heading text-4xl text-white">{opponentScore}</p>
                  <p className="text-xs text-gray-400">Total Score</p>
                </div>
              </div>
              <div className="space-y-4">
                {allRoasts.player2.map((roast, idx) => (
                  <div key={idx} className="bg-dark/70 p-4 rounded-xl border border-gray-600/20 hover:border-gray-500/50 transition">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-400">ROUND {idx + 1}</span>
                      <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">+{roundScores.player2[idx] || 0} pts</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed">"{roast}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEE REWARDS Button - AT BOTTOM */}
          <div className="text-center mt-8">
            <button
              onClick={() => setBattleComplete(true)}
              className="px-10 py-4 bg-gradient-to-r from-fire to-orange-600 text-white font-heading text-xl rounded-xl hover:from-fire/80 hover:to-orange-500/80 transition shadow-lg shadow-fire/30"
            >
              SEE REWARDS 💰
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== RESULT MODAL ====================
  if (battleComplete) {
    return (
      <BattleResultModal
        won={battleResult === 'win'}
        myScore={myScore}
        opponentScore={opponentScore}
        earnings={battleEarnings}
        onClose={onBattleEnd}
      />
    );
  }

  // ==================== BATTLE SCREEN ====================
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