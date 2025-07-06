
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Trophy, Users } from "lucide-react";

const SelectProject = () => {
  const [selectedQuest, setSelectedQuest] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const availableQuests = [
    { id: "farcaster", name: "Farcaster Mini App Challenge", reward: "5,000 USDC" },
    { id: "celo", name: "Celo Green Hackathon", reward: "10,000 CELO" },
    { id: "zk", name: "zk Builders Challenge", reward: "8,000 USDC" },
    { id: "self", name: "Self Protocol Credential Sprint", reward: "3,000 USDC" },
    { id: "divvi", name: "Divvi ZK Identity Quest", reward: "6,000 USDC" }
  ];

  const handleConfirmTeam = () => {
    if (!selectedQuest) {
      toast({
        title: "Please select a quest",
        variant: "destructive",
      });
      return;
    }

    const questName = availableQuests.find(q => q.id === selectedQuest)?.name;
    toast({
      title: `🎉 Team formed successfully!`,
      description: `You're now teamed up for ${questName}!`,
    });

    // Navigate to submit page after team confirmation
    setTimeout(() => {
      navigate("/submit");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Select Your Quest</h1>
          <p className="text-gray-600 dark:text-gray-400">Choose which quest you and your teammate want to tackle together</p>
        </div>

        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Team Quest Selection
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Both team members need to select the same quest to proceed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-base font-medium text-gray-900 dark:text-white mb-2 block">
                Choose a Quest *
              </label>
              <Select onValueChange={setSelectedQuest}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Select a quest from your joined quests" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                  {availableQuests.map((quest) => (
                    <SelectItem key={quest.id} value={quest.id} className="dark:text-white dark:hover:bg-gray-700">
                      <div className="flex items-center justify-between w-full">
                        <span>{quest.name}</span>
                        <div className="flex items-center text-sm text-yellow-600 dark:text-yellow-400 ml-2">
                          <Trophy className="h-3 w-3 mr-1" />
                          {quest.reward}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedQuest && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                  Selected Quest: {availableQuests.find(q => q.id === selectedQuest)?.name}
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  Once both team members select this quest, you'll be officially teamed up and can start building!
                </p>
              </div>
            )}

            <Button 
              onClick={handleConfirmTeam}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
              disabled={!selectedQuest}
            >
              Confirm Team & Quest
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SelectProject;
