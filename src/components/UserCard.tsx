
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    roles: string[];
    skills: string;
    availability: boolean;
    portfolioLinks?: string[];
    avatar?: string;
  };
}

const UserCard = ({ user }: UserCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const roleEmojis: { [key: string]: string } = {
    developer: "💻",
    designer: "🎨", 
    marketer: "📣",
    strategist: "🧠",
    builder: "🛠️"
  };

  const handleConnect = () => {
    toast({
      title: `Connected with ${user.name}! 🎉`,
      description: "Now select a quest to work on together.",
    });
    
    // Navigate to project selection after connection
    setTimeout(() => {
      navigate("/select-project");
    }, 1500);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{user.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                    {roleEmojis[role]} {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {user.availability && (
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              Available
            </Badge>
          )}
        </div>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{user.skills}</p>
        </div>

        {user.portfolioLinks && user.portfolioLinks.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Portfolio & Work</p>
            <div className="flex flex-wrap gap-2">
              {user.portfolioLinks.slice(0, 2).map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md transition-colors"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {link.replace(/^https?:\/\//, '').split('/')[0]}
                </a>
              ))}
              {user.portfolioLinks.length > 2 && (
                <span className="text-xs text-gray-400 px-2 py-1">
                  +{user.portfolioLinks.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        <Button 
          onClick={handleConnect}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
