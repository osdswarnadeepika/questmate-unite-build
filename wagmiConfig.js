import { createConfig, http } from 'wagmi';
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector';

const celoChain = {
  id: 42220,
  name: 'Celo',
  nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://forno.celo.org'] },
    public: { http: ['https://forno.celo.org'] },
  },
};

export const wagmiConfig = createConfig({
  chains: [celoChain],
  transports: {
    [celoChain.id]: http(),
  },
  connectors: [
    miniAppConnector()
    // Add other connectors if needed
  ],
}); 