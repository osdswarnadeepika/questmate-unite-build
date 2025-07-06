
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload, ExternalLink } from "lucide-react";

const Submit = () => {
  const [selectedQuest, setSelectedQuest] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const joinedQuests = [
    { id: "farcaster", name: "Farcaster Mini App Challenge" },
    { id: "celo", name: "Celo Green Hackathon" },
    { id: "zk", name: "zk Builders Challenge" },
    { id: "self", name: "Self Protocol Credential Sprint" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedQuest || !projectTitle || !description || !projectLink) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    setSubmitted(true);
    toast({
      title: "🎉 Project submitted successfully!",
      description: "Your submission has been recorded. You can now claim your quest reward!",
    });
  };

  const handleClaimReward = () => {
    toast({
      title: "🏆 Reward claimed!",
      description: "Your quest reward has been processed and will be available shortly.",
    });
    navigate("/rewards");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Submission Complete!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your project has been successfully submitted to the quest. 
                The review process will begin shortly.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={handleClaimReward}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  🏆 Claim Quest Reward
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/rewards")}
                  className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  View Rewards Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Submit Your Project</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to submit your quest project? Fill out the details below.
          </p>
        </div>

        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Upload className="h-5 w-5 mr-2 text-purple-600" />
              Project Submission
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Submit your completed project for quest evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-900 dark:text-white">
                  Select Quest *
                </Label>
                <Select onValueChange={setSelectedQuest}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Choose from your joined quests" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    {joinedQuests.map((quest) => (
                      <SelectItem key={quest.id} value={quest.id} className="dark:text-white dark:hover:bg-gray-700">
                        {quest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title" className="text-base font-medium text-gray-900 dark:text-white">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. FarcasterFrames - Social Mini App"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium text-gray-900 dark:text-white">
                  Project Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, what it does, technologies used, and key features..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="link" className="text-base font-medium text-gray-900 dark:text-white">
                  GitHub / Demo Link *
                </Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="https://github.com/username/project or https://demo.yourproject.com"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Provide a link to your code repository or live demo
                </p>
              </div>

              <Button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit Project
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submit;
