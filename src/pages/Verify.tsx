"use client";
import React, { useState, useEffect } from 'react';
import { SelfQRcodeWrapper, SelfAppBuilder } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';

const VERIFY_ENDPOINT = 'https://9530-2401-4900-8826-df5-2497-1bfa-7723-4c65.ngrok-free.app/api/verify'; // <-- Use your actual public endpoint
const SCOPE = 'questmate-app';

const Verify = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [selfApp, setSelfApp] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure this runs only on client to avoid hydration/SSR issues
  useEffect(() => {
    setIsClient(true);
    if (!userId && typeof window !== 'undefined') {
      setUserId(uuidv4());
    }
  }, [userId]);

  useEffect(() => {
    if (userId && isClient) {
      const app = new SelfAppBuilder({
        appName: 'QuestMate',
        scope: SCOPE,
        endpoint: VERIFY_ENDPOINT,
        userId,
        disclosures: {
          minimumAge: 13
        },
      }).build();
      setSelfApp(app);
    }
  }, [userId, isClient]);

  const showQR = isClient && userId && selfApp;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Verify Your Identity</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Scan this QR code with the Self app to verify your identity.</p>
      {showQR ? (
        <SelfQRcodeWrapper
          selfApp={selfApp}
          onSuccess={() => {
            localStorage.setItem('isSelfVerified', 'true');
            setSuccess(true);
          }}
          onError={() => {}}
          size={350}
        />
      ) : (
        <div style={{ width: 350, height: 350, background: 'white' }} />
      )}
      <p className="text-sm text-gray-500 mt-4">{userId ? `User ID: ${userId.substring(0, 8)}...` : ''}</p>
      {success && <p className="mt-4 text-green-600 font-semibold">Verification successful!</p>}
    </div>
  );
};

export default Verify; 