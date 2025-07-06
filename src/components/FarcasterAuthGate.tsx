import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const SIGNER_UUID = import.meta.env.VITE_NEYNAR_SIGNER_UUID;
const CLIENT_ID = import.meta.env.VITE_NEYNAR_CLIENT_ID;
const API_KEY = import.meta.env.VITE_NEYNAR_API_KEY;

const OAUTH_URL = `https://app.neynar.com/login?client_id=${CLIENT_ID}&signer_uuid=${SIGNER_UUID}&redirect_uri=${window.location.origin}/farcaster-callback`;

const FarcasterAuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // If redirected back from Neynar OAuth
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code && !user) {
      setLoading(true);
      // Exchange code for user info
      const fetchUser = async () => {
        try {
          // Neynar docs: https://docs.neynar.com/reference/post_v2_oauth_token
          const resp = await fetch('https://api.neynar.com/v2/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api_key': API_KEY,
            },
            body: JSON.stringify({
              code,
              client_id: CLIENT_ID,
              redirect_uri: `${window.location.origin}/farcaster-callback`,
              grant_type: 'authorization_code',
            }),
          });
          const data = await resp.json();
          if (data && data.user) {
            login({
              username: `@${data.user.username}`,
              avatar: data.user.pfp_url,
              fid: data.user.fid,
            });
            navigate('/profile', { replace: true });
          }
        } catch (e) {
          // handle error
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
    // eslint-disable-next-line
  }, []);

  if (user) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center justify-center">
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          onClick={() => {
            window.location.href = OAUTH_URL;
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login with Farcaster'}
        </Button>
      </div>
    </div>
  );
};

export default FarcasterAuthGate; 