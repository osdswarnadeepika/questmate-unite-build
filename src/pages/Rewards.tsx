
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Gift, Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { getReferralTag, submitReferral } from '@divvi/referral-sdk';
import { createWalletClient, custom } from 'viem';
import { celoAlfajores } from 'viem/chains';
import { SelfQRcodeWrapper, SelfAppBuilder } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';

const Rewards = () => {
  const { toast } = useToast();
  const [selfVerified, setSelfVerified] = useState(() => {
    return localStorage.getItem('self_verified') === 'true';
  });
  const [showQR, setShowQR] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [selfApp, setSelfApp] = useState<any>(null);

  useEffect(() => {
    if (showQR && !userId) {
      setUserId(uuidv4());
    }
  }, [showQR, userId]);

  useEffect(() => {
    if (userId) {
      const app = new SelfAppBuilder({
        appName: 'QuestMate',
        scope: 'questmate-app',
        endpoint: 'https://9530-2401-4900-8826-df5-2497-1bfa-7723-4c65.ngrok-free.app/api/verify',
        userId,
        disclosures: {
          minimumAge: 13,
          nationality: true,
          name: true,
          date_of_birth: true,
          ofac: true
        },
      }).build();
      setSelfApp(app);
    }
  }, [userId]);

  const handleMintCredential = () => {
    toast({
      title: "Credential Minting Coming Soon! 🎖️",
      description: "We're working on Self Protocol integration for verifiable credentials.",
    });
  };

  const handleClaimReward = () => {
    toast({
      title: "Rewards Coming Soon! 🎁",
      description: "We're integrating with Celo for token rewards and incentives.",
    });
  };

  const achievements = [
    {
      title: "Profile Complete",
      description: "Filled out your builder profile",
      icon: "✅",
      earned: true,
    },
    {
      title: "First Connection",
      description: "Connected with your first teammate",
      icon: "🤝",
      earned: false,
    },
    {
      title: "Team Builder",
      description: "Successfully formed 3 project teams",
      icon: "👥",
      earned: false,
    },
    {
      title: "Quest Master",
      description: "Completed 5 collaborative quests",
      icon: "🏆",
      earned: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Credentials & Rewards</h1>
          <p className="text-gray-600">Earn recognition and rewards for your contributions to the builder community</p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-purple-900">Mint Credential</CardTitle>
              </div>
              <CardDescription>
                Create verifiable credentials for your building achievements using Self Protocol
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selfVerified && !showQR && (
                <Button
                  onClick={() => setShowQR(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
                >
                  Verify Identity
                </Button>
              )}
              {showQR && !selfVerified && selfApp && (
                <div className="mb-4">
                  <SelfQRcodeWrapper
                    selfApp={selfApp}
                    onSuccess={() => {
                      localStorage.setItem('self_verified', 'true');
                      setSelfVerified(true);
                      setShowQR(false);
                      toast({ title: '✅ Self Verification Successful' });
                    }}
                    onError={() => {}}
                    size={350}
                  />
                </div>
              )}
              {selfVerified && (
                <Button
                  onClick={handleMintCredential}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Mint Credential
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Gift className="h-6 w-6 text-green-600" />
                <CardTitle className="text-green-900">Claim Reward</CardTitle>
              </div>
              <CardDescription>
                Claim token rewards for your participation and successful collaborations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleClaimReward}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Gift className="h-4 w-4 mr-2" />
                Claim Reward
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-500" />
              <CardTitle>Your Achievements</CardTitle>
            </div>
            <CardDescription>
              Track your progress and unlock new badges as you build and collaborate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    achievement.earned 
                      ? "border-green-200 bg-green-50" 
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className={`font-medium ${
                        achievement.earned ? "text-green-900" : "text-gray-700"
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${
                        achievement.earned ? "text-green-600" : "text-gray-500"
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  {achievement.earned ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Earned ✓
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">
                      Locked
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="text-center p-4">
            <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-sm text-gray-500">Achievements</div>
          </Card>
          
          <Card className="text-center p-4">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-500">Credentials</div>
          </Card>
          
          <Card className="text-center p-4">
            <Gift className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-500">Rewards</div>
          </Card>
          
          <Card className="text-center p-4">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">25%</div>
            <div className="text-sm text-gray-500">Progress</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
