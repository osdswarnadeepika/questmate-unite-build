
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quests = () => {
  const { toast } = useToast();

  const quests = [
    {
      id: 1,
      title: "Farcaster Mini App Challenge",
      description: "Build a mini app for the Farcaster ecosystem. Create engaging social experiences with Frames and cast actions.",
      deadline: "Jan 15, 2025",
      reward: "5,000 USDC + Farcaster OG Badge",
      category: "Social",
      difficulty: "Intermediate",
      participants: 234
    },
    {
      id: 2,
      title: "Celo Green Hackathon",
      description: "Develop climate-positive solutions on Celo. Focus on carbon credits, renewable energy, or sustainability tracking.",
      deadline: "Jan 20, 2025",
      reward: "10,000 CELO + Climate NFT",
      category: "Climate",
      difficulty: "Advanced",
      participants: 189
    },
    {
      id: 3,
      title: "zk Builders Challenge",
      description: "Create privacy-preserving applications using zero-knowledge proofs. Build the future of private computation.",
      deadline: "Feb 1, 2025",
      reward: "8,000 USDC + ZK Badge",
      category: "Privacy",
      difficulty: "Expert",
      participants: 156
    },
    {
      id: 4,
      title: "Self Protocol Credential Sprint",
      description: "Build decentralized identity solutions. Create verifiable credentials and identity verification systems.",
      deadline: "Jan 25, 2025",
      reward: "3,000 USDC + Credential NFT",
      category: "Identity",
      difficulty: "Intermediate",
      participants: 98
    },
    {
      id: 5,
      title: "Divvi ZK Identity Quest",
      description: "Develop zero-knowledge identity verification tools. Focus on privacy-preserving KYC and authentication.",
      deadline: "Feb 5, 2025",
      reward: "6,000 USDC + Identity Badge",
      category: "Identity",
      difficulty: "Advanced",
      participants: 127
    }
  ];

  const handleJoinQuest = (questTitle: string) => {
    toast({
      title: `Joined ${questTitle}! 🚀`,
      description: "You can now find teammates for this quest.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Active Quests & Hackathons</h1>
          <p className="text-gray-600 dark:text-gray-400">Join live Web3 challenges and build with amazing teammates</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {quests.map((quest) => (
            <Card key={quest.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{quest.title}</CardTitle>
                  <Badge className={getDifficultyColor(quest.difficulty)}>
                    {quest.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {quest.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      Deadline: {quest.deadline}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {quest.participants} builders joined
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="font-medium text-gray-900 dark:text-white">{quest.reward}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                      {quest.category}
                    </Badge>
                    <Button 
                      onClick={() => handleJoinQuest(quest.title)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Join Quest
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Don't see a quest you're interested in?</p>
          <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            <ExternalLink className="h-4 w-4 mr-2" />
            Suggest a Quest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quests;
