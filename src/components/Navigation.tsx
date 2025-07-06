
import { Wallet, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">QuestMate</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {location.pathname !== "/" && (
              <div className="hidden sm:flex items-center space-x-6">
                <Link 
                  to="/profile" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Profile
                </Link>
                <Link 
                  to="/match" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Find Teammates
                </Link>
                <Link 
                  to="/rewards" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Rewards
                </Link>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
