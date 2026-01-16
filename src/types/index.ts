export interface User {
  id: string;
  walletAddress: string;
  username?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Battle {
  id: string;
  player1Id: string;
  player2Id: string;
  winnerId?: string;
  tier: "Bronze" | "Silver" | "Gold" | "Diamond";
  entryFee: number;
  prizePool: number;
  status: "pending" | "active" | "completed" | "cancelled";
  txSignature?: string;
  createdAt: Date;
  endedAt?: Date;
}

export interface Round {
  id: string;
  battleId: string;
  roundNumber: number;
  prompt: string;
  player1AudioUrl?: string;
  player2AudioUrl?: string;
  player1Score?: number;
  player2Score?: number;
  player1Commentary?: string;
  player2Commentary?: string;
  createdAt: Date;
}

export interface Clip {
  id: string;
  battleId: string;
  creatorId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  viewCount: number;
  reactionCount: number;
  createdAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username?: string;
  walletAddress: string;
  avatarUrl?: string;
  wins: number;
  losses: number;
  totalEarnings: number;
}

export interface Reaction {
  emoji: string;
  senderId: string;
  battleId: string;
  timestamp: Date;
}

export interface AIScore {
  savagery: number;
  creativity: number;
  delivery: number;
  relevance: number;
  total: number;
  commentary: string;
}
