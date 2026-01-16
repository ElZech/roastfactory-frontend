# RoastPush

Real-time multiplayer roast battle platform where users compete in voice-first battles for ROAST token rewards.

## Features

- **1v1 & Group Battles**: Compete in Bronze, Silver, Gold, or Diamond tiers
- **Voice-First Roasting**: Record voice roasts or type them out
- **AI Judging**: Get scored on savagery, creativity, delivery, and relevance
- **Live Reactions**: Emoji reactions that influence the battle
- **Instant Clips**: Auto-generated vertical clips for social sharing
- **ROAST Token Rewards**: Skill-based SOL earnings
- **Leaderboards**: Daily, weekly, and all-time rankings

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, Tailwind CSS, Radix UI
- **State**: Zustand
- **Blockchain**: Solana, @solana/wallet-adapter
- **Real-time**: Socket.io
- **AI**: OpenAI for prompts and judging

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Solana wallet (Phantom recommended)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Fill in your environment variables
# See .env.example for required variables

# Run development server
npm run dev
```

### Environment Variables

```env
# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_ROAST_TOKEN_MINT=your_token_mint_address

# API
NEXT_PUBLIC_API_URL=https://api.roastpush.app
NEXT_PUBLIC_WS_URL=wss://ws.roastpush.app

# Backend (server-side only)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
```

## Token Economics

ROAST is the native settlement token:

- **Entry Fees**: Pay ROAST to enter ranked battles
- **Prize Pools**: Winners receive ROAST from pools
- **Tips**: Tip performers during battles
- **Cosmetics**: Purchase premium arenas and themes

### Fee Structure

| Activity | Fee Rate |
|----------|----------|
| Battle Prize Pool | 5% platform fee |
| Tips | 2% processing fee |
| Cosmetics | 15% margin |

### Fee Routing

All protocol fees (100%) go to the creator.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Environment Setup

1. Set all required environment variables in Vercel
2. Configure your Solana RPC endpoint (Helius, QuickNode recommended)
3. Set up PostgreSQL database (Supabase recommended)
4. Configure Redis for matchmaking queue

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── battle/      # Battle-specific components
│   ├── shared/      # Shared UI components
│   ├── ui/          # Base UI primitives
│   └── wallet/      # Wallet integration components
├── config/          # Configuration constants
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── types/           # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

---

Built with Web3 Factory
