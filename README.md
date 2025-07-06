# QuestMate Unite

A web application for connecting builders, designers, and creators for hackathons and collaborative projects.

## Features

- **Team Matching**: Connect with like-minded builders and creators
- **Self Protocol Integration**: Verifiable identity verification using passport scanning
- **Celo Blockchain Integration**: Smart contract interactions on Alfajores testnet
- **Farcaster Mini App**: Frame-compatible rewards system

## Farcaster Frame Setup

This application includes a Farcaster Frame for claiming rewards. The frame is accessible at `/rewards` and includes:

### Required Environment Variables

Create a `.env` file in the root directory with:

```bash
# Neynar API Key for Farcaster Frame validation
NEYNAR_API_KEY=your_neynar_api_key_here

# Other existing variables...
VITE_NEYNAR_API_KEY=your_neynar_api_key_here
VITE_NEYNAR_CLIENT_ID=your_neynar_client_id_here
VITE_NEYNAR_SIGNER_UUID=your_neynar_signer_uuid_here
```

### Frame Endpoints

- **Frame URL**: `https://questmate-unite-build.vercel.app/rewards`
- **Frame Handler**: `/api/frame-handler`
- **Preview Image**: `/preview.svg`
- **Success Image**: `/success.svg`
- **Error Image**: `/error.svg`

### Frame Features

- ✅ Validates incoming frame requests using Neynar SDK
- ✅ Logs user FID for analytics
- ✅ Returns success/error responses with appropriate images
- ✅ Compatible with Warpcast and other Farcaster clients

## Development

```bash
npm install
npm run dev
```

## Deployment

The application is configured for deployment on Vercel. The Farcaster Frame will be automatically available at the deployed URL.

## License

MIT
