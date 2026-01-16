import { PublicKey } from "@solana/web3.js";

// Token Configuration
export const ROAST_TOKEN_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_ROAST_TOKEN_MINT || "GRv23yBYo1fMqDY8Ws2LqjwHoLx4TGUqYi7KfCDkBAGS"
);
export const ROAST_DECIMALS = 9;

// Fee Configuration
export const PLATFORM_FEE_PERCENTAGE = 5;
export const TIP_FEE_PERCENTAGE = 2;

// Fee Routing
export const FEE_ROUTING = {
  CREATOR_BPS: 10000, // 100%
} as const;

// Battle Tiers
export const BATTLE_TIERS = {
  Bronze: { entry: 10, color: "#CD7F32" },
  Silver: { entry: 50, color: "#C0C0C0" },
  Gold: { entry: 100, color: "#FFD700" },
  Diamond: { entry: 500, color: "#00D9FF" },
} as const;

export type BattleTier = keyof typeof BATTLE_TIERS;

// Battle Configuration
export const BATTLE_CONFIG = {
  ROUNDS: 3,
  ROUND_DURATION: 30, // seconds
  MATCHMAKING_TIMEOUT: 60, // seconds
} as const;

// Reaction Emojis
export const REACTION_EMOJIS = ["🔥", "💀", "😂", "👎", "🤯", "💯"] as const;

// API URLs
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";
