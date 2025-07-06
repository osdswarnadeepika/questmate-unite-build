
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [skills, setSkills] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [available, setAvailable] = useState(true);
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const roles = [
    { id: "developer", label: "💻 Developer", emoji: "💻" },
    { id: "designer", label: "🎨 Designer", emoji: "🎨" },
    { id: "marketer", label: "📣 Marketer", emoji: "📣" },
    { id: "strategist", label: "🧠 Strategist", emoji: "🧠" },
    { id: "builder", label: "🛠️ Builder", emoji: "🛠️" },
  ];

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      toast({
        title: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (selectedRoles.length === 0) {
      toast({
        title: "Please select at least one role",
        variant: "destructive",
      });
      return;
    }

    if (!skills.trim()) {
      toast({
        title: "Please add your skills",
        variant: "destructive",
      });
      return;
    }

    if (!lookingFor) {
      toast({
        title: "Please select what you're looking for",
        variant: "destructive",
      });
      return;
    }

    // Save profile (in real app, this would go to backend)
    console.log("Profile saved:", {
      name,
      roles: selectedRoles,
      skills,
      lookingFor,
      available,
      portfolioLinks
    });

    toast({
      title: "Profile saved successfully! 🎉",
      description: "You can now find teammates and join quests.",
    });

    // Navigate to quests page after successful save
    setTimeout(() => {
      navigate("/quests");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Set up your profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Tell us about yourself so we can find you the perfect teammates</p>
        </div>

        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Your Builder Profile</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Fill out your information to start connecting with other builders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white">Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Alice Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Role Selection */}
              <div>
                <Label className="text-base font-medium text-gray-900 dark:text-white">Roles *</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Select all that apply</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedRoles.includes(role.id)
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-1">{role.emoji}</div>
                      <div className="text-sm font-medium">{role.label.replace(role.emoji + " ", "")}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <Label htmlFor="skills" className="text-base font-medium text-gray-900 dark:text-white">Skills *</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">What technologies, tools, or expertise do you bring?</p>
                <Textarea
                  id="skills"
                  placeholder="e.g. React, Node.js, UI/UX Design, Growth Marketing, Python, Figma..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Looking For */}
              <div>
                <Label className="text-base font-medium text-gray-900 dark:text-white">Looking For *</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">What type of collaboration interests you?</p>
                <Select onValueChange={setLookingFor}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Select what you're looking for" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    <SelectItem value="quests" className="dark:text-white dark:hover:bg-gray-700">🎯 Quests</SelectItem>
                    <SelectItem value="hackathons" className="dark:text-white dark:hover:bg-gray-700">⚡ Hackathons</SelectItem>
                    <SelectItem value="side-projects" className="dark:text-white dark:hover:bg-gray-700">🚀 Side Projects</SelectItem>
                    <SelectItem value="all" className="dark:text-white dark:hover:bg-gray-700">🌟 All of the above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Portfolio Links */}
              <div>
                <Label htmlFor="portfolio" className="text-base font-medium text-gray-900 dark:text-white">🛠️ Proof of Work / Portfolio (optional)</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Share links to your work, GitHub, portfolio, or social profiles</p>
                <Textarea
                  id="portfolio"
                  placeholder="e.g. https://github.com/yourname/project&#10;https://linktr.ee/yourprofile&#10;https://yourportfolio.com"
                  value={portfolioLinks}
                  onChange={(e) => setPortfolioLinks(e.target.value)}
                  className="min-h-[80px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Separate multiple links with new lines</p>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <Label htmlFor="availability" className="text-base font-medium text-gray-900 dark:text-white">Available for projects</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Let others know if you're currently available</p>
                </div>
                <Switch
                  id="availability"
                  checked={available}
                  onCheckedChange={setAvailable}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg rounded-lg"
              >
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
