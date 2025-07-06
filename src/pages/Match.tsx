
import { useState } from "react";
import UserCard from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Filter } from "lucide-react";

const Match = () => {
  const [roleFilter, setRoleFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Sample user data
  const sampleUsers = [
    {
      id: "1",
      name: "Alex Chen",
      roles: ["developer"],
      skills: "React, TypeScript, Node.js, PostgreSQL. Full-stack developer with 5 years experience building web applications. Love working on developer tools and fintech products.",
      availability: true,
      portfolioLinks: ["https://github.com/alexchen", "https://alexchen.dev", "https://linkedin.com/in/alexchen"]
    },
    {
      id: "2", 
      name: "Sarah Kim",
      roles: ["designer", "marketer"],
      skills: "UI/UX Design, Figma, Brand Strategy, Content Marketing. Passionate about creating user-centered designs and building authentic brand experiences.",
      availability: true,
      portfolioLinks: ["https://dribbble.com/sarahkim", "https://sarahkim.design"]
    },
    {
      id: "3",
      name: "Marcus Rodriguez",
      roles: ["developer"],
      skills: "Python, Django, Machine Learning, Data Science. AI/ML engineer interested in building products that solve real-world problems.",
      availability: false,
      portfolioLinks: ["https://github.com/marcusrodriguez", "https://kaggle.com/marcusrodriguez"]
    },
    {
      id: "4",
      name: "Emily Zhang",
      roles: ["designer"],
      skills: "Product Design, Prototyping, User Research, Design Systems. 7+ years designing mobile apps and web platforms for startups and enterprises.",
      availability: true,
      portfolioLinks: ["https://emilyzhang.portfolio.com", "https://behance.net/emilyzhang", "https://twitter.com/emilyzhang"]
    },
    {
      id: "5",
      name: "David Park",
      roles: ["marketer", "developer"],
      skills: "Growth Marketing, SEO, Analytics, JavaScript. Full-stack marketer who codes. Love experimenting with growth strategies and building marketing tools.",
      availability: true,
      portfolioLinks: ["https://davidpark.co", "https://github.com/davidpark"]
    },
    {
      id: "6",
      name: "Lisa Wang",
      roles: ["developer"],
      skills: "Blockchain, Solidity, Web3, DeFi. Smart contract developer building the future of decentralized finance. Previously worked at top crypto companies.",
      availability: true,
      portfolioLinks: ["https://github.com/lisawang", "https://lisawang.eth"]
    }
  ];

  const filteredUsers = sampleUsers.filter(user => {
    if (roleFilter !== "all" && !user.roles.includes(roleFilter)) {
      return false;
    }
    if (availabilityFilter === "available" && !user.availability) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Teammates</h1>
          <p className="text-gray-600">Connect with builders ready to collaborate on amazing projects</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{sampleUsers.length}</div>
              <div className="text-sm text-gray-500">Total Builders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {sampleUsers.filter(u => u.availability).length}
              </div>
              <div className="text-sm text-gray-500">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(sampleUsers.flatMap(u => u.roles)).size}
              </div>
              <div className="text-sm text-gray-500">Different Roles</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium text-gray-900">Filter Teammates</h3>
            </div>
            <Badge variant="secondary">
              {filteredUsers.length} results
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="developer">💻 Developer</SelectItem>
                  <SelectItem value="designer">🎨 Designer</SelectItem>
                  <SelectItem value="marketer">📣 Marketer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="available">Available Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* User Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teammates found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
            <Button 
              onClick={() => {
                setRoleFilter("all");
                setAvailabilityFilter("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
