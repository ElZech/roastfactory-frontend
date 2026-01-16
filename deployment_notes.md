# RoastPush Deployment Notes

## Pre-Deployment Checklist

### 1. Token Creation

Before deploying, create the ROAST token using Bags SDK:

```bash
# Set environment variables
export BAGS_API_KEY=your_bags_api_key
export CREATOR_WALLET=your_creator_wallet_address
export SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
export NETWORK=mainnet-beta

# Run token creation script (from bags_config.json)
node scripts/create-token.js
```

After token creation, update `.env.local`:
```env
NEXT_PUBLIC_ROAST_TOKEN_MINT=<created_token_mint_address>
```

### 2. Infrastructure Setup

#### Database (PostgreSQL)
- Recommended: Supabase, Neon, or Railway
- Run migrations to create tables

#### Redis
- Required for matchmaking queue
- Recommended: Upstash Redis (serverless)

#### Storage
- Cloudflare R2 for media storage
- Configure CORS for your domain

### 3. Environment Variables

Create `.env.local` with all required variables:

```env
# Public (exposed to browser)
NEXT_PUBLIC_SOLANA_RPC_URL=https://your-rpc-endpoint.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_ROAST_TOKEN_MINT=<your_token_mint>
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_WS_URL=wss://ws.yourdomain.com

# Server-side only
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
CLOUDFLARE_R2_ACCESS_KEY=...
CLOUDFLARE_R2_SECRET_KEY=...
CLOUDFLARE_R2_BUCKET=roastpush-media
CLOUDFLARE_R2_ENDPOINT=https://account.r2.cloudflarestorage.com
```

### 4. Build & Deploy

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Build locally first
npm run build

# Deploy
vercel deploy --prod
```

#### Manual Build

```bash
npm run build
npm start
```

## Post-Deployment

### 1. Verify Token Integration
- Connect wallet on the deployed site
- Check that ROAST balance displays correctly
- Test a battle entry (on devnet first)

### 2. Configure WebSocket Server
- Deploy Socket.io server for real-time battles
- Update NEXT_PUBLIC_WS_URL in production

### 3. Set Up Monitoring
- Add Sentry for error tracking
- Configure Vercel Analytics
- Set up uptime monitoring

## Fee Routing

All protocol fees (100%) go to the creator.

This is configured in `src/config/constants.ts`.

## Security Checklist

- [ ] All API keys are in environment variables (not in code)
- [ ] CSP headers configured in next.config.js
- [ ] Rate limiting enabled on API routes
- [ ] Input validation on all endpoints
- [ ] HTTPS enforced in production
- [ ] Wallet signature verification on auth

## Scaling Considerations

### High Traffic
- Use premium RPC endpoints (Helius, QuickNode)
- Add Redis caching for leaderboards
- Consider CDN for clip distribution

### Database
- Add read replicas for leaderboard queries
- Implement connection pooling
- Regular backups

## Support

For issues or questions:
- Check the Web3 Factory documentation
- Open an issue in the repository
- Contact the App Factory team
