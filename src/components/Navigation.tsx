
import { Users, Moon, Sun, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const handleFarcasterLogin = () => {
    // Simulate Farcaster login
    login({ 
      username: "@alice.eth", 
      avatar: undefined 
    });
    toast({
      title: "Welcome to QuestMate! 🧬",
      description: "Successfully logged in with Farcaster",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">QuestMate</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {location.pathname !== "/" && (
              <div className="hidden sm:flex items-center space-x-6">
                <Link 
                  to="/profile" 
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Profile
                </Link>
                <Link 
                  to="/quests" 
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Quests
                </Link>
                <Link 
                  to="/match" 
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Find Teammates
                </Link>
                <Link 
                  to="/rewards" 
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Rewards
                </Link>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-sm">
                    {user?.username.slice(1, 3).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700 dark:text-gray-300">{user?.username}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFarcasterLogin}
                className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
              >
                <Zap className="h-4 w-4 mr-2" />
                Login with Farcaster
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
