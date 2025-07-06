
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Zap, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SelfQRcodeWrapper, SelfAppBuilder } from "@selfxyz/qrcode";
import { ethers } from "ethers";

const CELO_ALFAJORES_CHAIN_ID = 44787;
const CONTRACT_ADDRESS = "0xFf9D1a97cee08C8481e41749C7E7DD857b4A1D6e";
import MyContractAbi from "../../abi/MyContract.json";

const Landing = () => {
  const [proofStatus, setProofStatus] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Generate a user ID when the component mounts
    import('uuid').then(({ v4 }) => setUserId(v4()));
  }, []);

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [network, setNetwork] = useState<any>(null);

  // Helper to show toast (replace with your toast system if needed)
  function showToast(msg) {
    if (window && window.alert) window.alert(msg);
  }

  // Connect wallet function
  async function connectWallet() {
    if (!(window as any).ethereum) {
      showToast("No wallet found. Please install MetaMask or a Celo-compatible wallet.");
      return;
    }
    const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
    await ethProvider.send("eth_requestAccounts", []);
    const signer = await ethProvider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    setProvider(ethProvider);
    const net = await ethProvider.getNetwork();
    setNetwork(net);
  }

  // Update runContract to use ethers
  async function runContract() {
    if (!provider || !walletAddress) {
      showToast("Please connect your wallet to run the contract.");
      return;
    }
    if (network?.chainId !== CELO_ALFAJORES_CHAIN_ID) {
      showToast("Please switch to Celo Alfajores testnet (chainId 44787)");
      return;
    }
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MyContractAbi, signer);
      const tx = await contract.markAsVerified(walletAddress);
      showToast(`Success! Tx hash: ${tx.hash}`);
      console.log("Transaction success:", tx);
    } catch (err: any) {
      showToast("Contract call failed: " + (err.message || err));
      console.error("Contract call error:", err);
    }
  }

  // Build the selfApp config only when userId is available
  const selfApp = userId
    ? new SelfAppBuilder({
        appName: "QuestMate",
        scope: "myapp-prod",
        endpoint: "https://7704-2401-4900-8826-df5-cd4c-8527-f172-296e.ngrok-free.app/verify",
        userId,
        disclosures: {
          name: true,
          nationality: true,
          date_of_birth: true,
          minimumAge: 18,
          ofac: true,
        },
      }).build()
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Find your next
            <span className="text-purple-600 dark:text-purple-400 block">hackathon teammate</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with builders, designers, and creators. Team up for quests, hackathons, 
            and side projects that matter.
          </p>
          
          <Link to="/profile">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Find Your Tribe</h3>
              <p className="text-gray-600 dark:text-gray-400">Connect with like-minded builders and creators ready to collaborate.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quick Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">Smart algorithms match you with teammates based on skills and goals.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">Build your reputation and earn credentials for successful collaborations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of builders already collaborating on QuestMate
          </p>
          <Link to="/profile">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full"
            >
              Create Your Profile
            </Button>
          </Link>
        </div>
      </div>
      {/* Replace old QR code logic with SelfQRcodeWrapper */}
      {selfApp && (
        <SelfQRcodeWrapper
          selfApp={selfApp}
          onSuccess={() => setProofStatus("Verification successful!")}
          onError={() => setProofStatus("Verification failed. Try again.")}
          size={300}
        />
      )}
      <p className="text-sm text-center">{proofStatus}</p>
      <Button onClick={connectWallet} className="mb-2">Connect Wallet</Button>
      <Button onClick={runContract} className="mb-2">Mark as Verified</Button>
    </div>
  );
};

export default Landing;
