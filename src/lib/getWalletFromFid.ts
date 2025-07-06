import { NeynarAPIClient } from "@neynar/nodejs-sdk";

// NeynarAPIClient expects a configuration object, not a string
const client = new NeynarAPIClient({ apiKey: process.env.NEYNAR_API_KEY! });

export async function getWalletFromFid(fid: number): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_NEYNAR_API_KEY;
    const res = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
      headers: {
        'accept': 'application/json',
        'api_key': apiKey,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const wallet = data?.users?.[0]?.verified_addresses?.eth_addresses?.[0] ?? null;
    return wallet;
  } catch (err) {
    console.error("Error fetching wallet for FID", fid, err);
    return null;
  }
} 