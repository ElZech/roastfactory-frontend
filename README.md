# 🎨 RoastFactory Frontend

Beautiful, real-time multiplayer roast battle game built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)
![Socket.io](https://img.shields.io/badge/Socket.io-Client-010101?style=flat-square&logo=socket.io)

## ✨ Features

### 🎮 Real-Time Multiplayer
- Instant matchmaking by tier (Bronze, Silver, Gold, Diamond)
- Live opponent matching with WebSocket connections
- Real-time roast submissions and scoring
- Persistent socket connections across navigation

### 🤖 AI-Powered Judging
- GPT-4o-mini judges every roast
- Detailed scoring breakdowns (Savagery, Creativity, Delivery, Relevance)
- Savage AI commentary after each round
- Fair, objective, and brutal

### 💎 Battle System
- 3-round battles with unique prompts per tier
- 30-second timer per round
- Text and voice mode support
- Live emoji reactions during battles
- Victory screens with detailed stats

### 🔐 Web3 Integration
- Solana Phantom wallet connection
- Wallet-based user authentication
- Ready for $ROAST token rewards
- User stats and leaderboards

### 📱 Responsive Design
- Mobile-first dark theme
- Smooth animations and transitions
- Fire-themed UI with gradients
- Optimized for all screen sizes

## 🎯 User Flow
```
Landing Page → Connect Wallet → Select Tier → Matchmaking 
    ↓
Battle Arena (3 Rounds)
    ↓
Victory/Defeat Screen → Stats Updated
```

## 🏗️ Project Structure
```
src/
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Landing page
│   ├── battle/            # Battle flow
│   └── providers.tsx      # Wallet providers
├── components/
│   ├── battle/            # Battle components
│   │   ├── BattleArena.tsx
│   │   ├── MatchmakingLoader.tsx
│   │   ├── PlayerCard.tsx
│   │   ├── VoiceRecorder.tsx
│   │   └── BattleResultModal.tsx
│   ├── shared/            # Shared components
│   │   ├── Header.tsx
│   │   └── WalletButton.tsx
│   └── ui/                # UI primitives
├── hooks/
│   └── useSocket.ts       # Global Socket.io hook
└── config/
    └── constants.ts       # Battle configuration
```

## 🛠️ Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### Real-Time
- **Socket.io Client** - WebSocket communication
- **Custom singleton hook** - Persistent connections

### Web3
- **@solana/wallet-adapter-react** - Wallet integration
- **@solana/web3.js** - Solana blockchain interaction

### UI/UX
- **lucide-react** - Icon library
- **Framer Motion** - Animations (planned)
- **Custom fire theme** - Brand identity

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+
npm or yarn
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/ElZech/roastfactory-frontend.git
cd roastfactory-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
# Add:
# NEXT_PUBLIC_WS_URL=ws://localhost:4000
# NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary (Fire):** `#FF4500` - Main brand color
- **Background:** `#0A0A0F` - Dark base
- **Surface:** `#1A1A2E` - Cards and containers
- **Text:** `#FFFFFF` - High contrast

### Typography
- **Heading:** Custom font with uppercase styling
- **Body:** Clean, readable sans-serif

### Components
- Glass morphism effects
- Smooth hover transitions
- Pulse animations for active states
- Fire gradient overlays

## 🔌 Socket.io Integration

The app uses a **singleton pattern** for Socket.io to maintain one connection throughout the session:
```typescript
// Global socket - created once, reused everywhere
const globalSocket = io('ws://localhost:4000');

// Components access the same socket
const socket = useSocket();
```

### Key Events Handled
- Connection/disconnection management
- Battle matching notifications
- Round start/end events
- Real-time scoring updates
- Opponent actions

## 📱 Mobile Optimization

- Touch-friendly UI elements
- Responsive breakpoints
- Scroll behavior optimization
- Bottom navigation for mobile
- Proper spacing for virtual keyboards

## ⚡ Performance

- **Next.js 14** - Server components where possible
- **Code splitting** - Automatic route-based splitting
- **Image optimization** - Next.js Image component
- **Bundle size** - Optimized with tree-shaking
- **Socket singleton** - One connection, minimal overhead

## 🚧 Roadmap

- [ ] Voice recording and playback
- [ ] Clip generation and sharing
- [ ] Tournament mode
- [ ] Friends and private battles
- [ ] Mobile app (React Native)
- [ ] Real $ROAST token integration
- [ ] NFT profile pictures
- [ ] Battle replays

## 🎯 Battle Tiers

### Bronze 🥉
- Entry level
- Lower stakes
- Practice matches

### Silver 🥈
- Intermediate
- Medium stakes
- Competitive

### Gold 🥇
- Advanced
- High stakes
- Serious competition

### Diamond 💎
- Expert
- Highest stakes
- Elite battles

## 🧪 Testing
```bash
# Run tests
npm test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

## 📦 Build & Deploy
```bash
# Production build
npm run build

# Start production server
npm start
```

### Deployment
Optimized for Vercel deployment:
```bash
vercel deploy
```

## 🤝 Contributing

Contributions welcome! Please follow:
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT

## 👨‍💻 Built By

**ElZech** - [GitHub](https://github.com/ElZech)

### Connect
- Twitter: [@RoastFactorySOL]
- BagsApp: [https://bags.fm/GRv23yBYo1fMqDY8Ws2LqjwHoLx4TGUqYi7KfCDkBAGS]

---

**Built with ❤️**🚀

*"Where your mouth writes checks your wallet can cash"* 💰
