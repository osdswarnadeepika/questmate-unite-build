
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  
  const roleEmojis: { [key: string]: string } = {
    developer: "💻",
    designer: "🎨", 
    marketer: "📣"
  };

  const handleConnect = () => {
    toast({
      title: `Connected with ${user.name}! 🎉`,
      description: "They'll receive your connection request.",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {roleEmojis[role]} {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {user.availability && (
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              Available
            </Badge>
          )}
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">{user.skills}</p>
        </div>

        {user.portfolioLinks && user.portfolioLinks.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Portfolio & Work</p>
            <div className="flex flex-wrap gap-2">
              {user.portfolioLinks.slice(0, 2).map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
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
