import { NeynarAPIClient } from '@neynar/nodejs-sdk';

// Initialize Neynar client
const client = new NeynarAPIClient({ apiKey: process.env.NEYNAR_API_KEY || '' });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract frame data from request body
    const { trustedData, untrustedData } = req.body;

    if (!trustedData) {
      console.error('Invalid frame request - no trustedData');
      return res.status(400).json({ error: 'Invalid frame request' });
    }

    // Extract user FID from the frame request
    const userFid = trustedData.messageBytes?.interactor?.fid;
    
    if (userFid) {
      console.log(`🎉 Frame interaction from FID: ${userFid}`);
      
      // You can add additional logic here:
      // - Store the claim in a database
      // - Send notifications
      // - Update user rewards
    }

    // Return the frame response with success image and "✅ Claimed" button
    const frameResponse = {
      frames: [
        {
          image: "https://questmate-unite-build.vercel.app/success.svg",
          buttons: [
            {
              label: "✅ Claimed",
              action: "post"
            }
          ]
        }
      ]
    };

    // Set proper headers for frame response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    
    return res.status(200).json(frameResponse);

  } catch (error) {
    console.error('Frame handler error:', error);
    
    // Return error frame
    const errorResponse = {
      frames: [
        {
          image: "https://questmate-unite-build.vercel.app/error.svg",
          buttons: [
            {
              label: "Try Again",
              action: "post"
            }
          ]
        }
      ]
    };

    return res.status(200).json(errorResponse);
  }
} 