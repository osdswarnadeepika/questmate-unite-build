import {
  SelfBackendVerifier,
  AttestationId,
  IConfigStorage,
  VerificationConfig
} from '@selfxyz/core';

// Configuration storage implementation
class ConfigStorage implements IConfigStorage {
  async getConfig(configId: string): Promise<VerificationConfig> {
    return {
      minimumAge: 13
    };
  }
  async getActionId(userIdentifier: string, userDefinedData: string) {
    return 'default_config';
  }
  async setConfig(id: string, config: VerificationConfig): Promise<boolean> {
    return true;
  }
}

// Initialize verifier once
const allowedIds = new Map();
allowedIds.set(1, true); // Accept passports

const selfBackendVerifier = new SelfBackendVerifier(
  'questmate-scope',
  'https://9530-2401-4900-8826-df5-2497-1bfa-7723-4c65.ngrok-free.app/api/verify', // Use your deployed/ngrok endpoint
  false, // false = real passports, true = mock for testing
  allowedIds,
  new ConfigStorage(),
  'uuid' // UserIdType.UUID as string if not exported
);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { attestationId, proof, pubSignals, userContextData } = req.body;

      if (!attestationId || !proof || !pubSignals || !userContextData) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Verify the proof
      const result = await selfBackendVerifier.verify(
        attestationId,
        proof,
        pubSignals,
        userContextData
      );

      if (result.isValidDetails.isValid) {
        // Return successful verification response
        return res.status(200).json({
          status: 'success',
          result: true,
          credentialSubject: result.discloseOutput
        });
      } else {
        // Return failed verification response
        return res.status(400).json({
          status: 'error',
          result: false,
          message: 'Verification failed',
          details: result.isValidDetails
        });
      }
    } catch (error: any) {
      // Fallback error handler for config mismatch or other errors
      return res.status(500).json({
        status: 'error',
        result: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
} 