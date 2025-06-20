
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  CreditCard, 
  User,
  Plus,
  ArrowLeft,
  DollarSign,
  Calendar,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("groups");
  const navigate = useNavigate();

  const members = [
    { id: 1, name: "Ethan Carter", status: "paid", avatar: "EC", amount: "$500" },
    { id: 2, name: "Olivia Bennett", status: "paid", avatar: "OB", amount: "$500" },
    { id: 3, name: "Noah Thompson", status: "paid", avatar: "NT", amount: "$500" },
    { id: 4, name: "Sophia Walker", status: "paid", avatar: "SW", amount: "$500" },
    { id: 5, name: "Liam Harris", status: "paid", avatar: "LH", amount: "$500" },
    { id: 6, name: "Ava Lewis", status: "pending", avatar: "AL", amount: "$0" },
    { id: 7, name: "Jackson Clark", status: "pending", avatar: "JC", amount: "$0" },
    { id: 8, name: "Isabella Young", status: "pending", avatar: "IY", amount: "$0" },
  ];

  const currentCycleMembers = [
    { id: 1, name: "Liam Carter", status: "paid", avatar: "LC", date: "Dec Jul 5" },
    { id: 2, name: "Sophia Bennett", status: "paid", avatar: "SB", date: "Paid: Jul 1" },
    { id: 3, name: "Ethan Harper", status: "paid", avatar: "EH", date: "Dec Jul 8" },
    { id: 4, name: "Olivia Foster", status: "paid", avatar: "OF", date: "Paid: Jul 1" },
  ];

  const previousCycleMembers = [
    { id: 1, name: "Liam Carter", status: "paid", avatar: "LC", date: "Paid: June 1" },
    { id: 2, name: "Sophia Bennett", status: "paid", avatar: "SB", date: "Paid: June 1" },
    { id: 3, name: "Ethan Harper", status: "paid", avatar: "EH", date: "Paid: June 1" },
    { id: 4, name: "Olivia Foster", status: "paid", avatar: "OF", date: "Paid: June 1" },
  ];

  const upcomingPayouts = [
    { id: 3, name: "Member 3", date: "July 15, 2024" },
    { id: 4, name: "Member 4", date: "August 15, 2024" },
    { id: 5, name: "Member 5", date: "September 15, 2024" },
  ];

  const pastPayouts = [
    { id: 1, name: "Member 1", date: "April 15, 2024" },
    { id: 2, name: "Member 2", date: "May 15, 2024" },
    { id: 3, name: "Member 3", date: "June 15, 2024" },
  ];

  const recentActivity = [
    { user: "Ethan Carter", action: "paid $500", date: "July 1, 2024" },
    { user: "Olivia Bennett", action: "paid $500", date: "July 1, 2024" },
    { user: "Noah Thompson", action: "paid $500", date: "July 1, 2024" },
  ];

  const renderGroupDetails = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentView("groups")}
            className="text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Tontine Group</h1>
        </div>
      </div>

      {/* Group Stats */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Group Details</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold text-white">$5,000</span>
            </div>
            <p className="text-gray-400">Total Pool</p>
            <p className="text-sm text-gray-500">Next payout: July 15, 2024</p>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-green-600 text-white">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-gray-400">{member.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{member.amount}</span>
                <div className={`w-3 h-3 rounded-full ${
                  member.status === "paid" ? "bg-green-500" : "bg-gray-500"
                }`}></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
              <DollarSign className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <p className="text-white">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-sm text-gray-400">{activity.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderPaymentStatus = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Payment Status</h1>
      </div>

      {/* Current Cycle */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Current Cycle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentCycleMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-green-600 text-white">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-gray-400">{member.date}</p>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Previous Cycles */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Previous Cycles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {previousCycleMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-green-600 text-white">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-gray-400">{member.date}</p>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderPayoutSchedule = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Payout Schedule</h1>
      </div>

      {/* Upcoming Payouts */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Upcoming Payouts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingPayouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold">{payout.id}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{payout.name}</p>
                  <p className="text-sm text-gray-400">{payout.date}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Past Payouts */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Past Payouts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pastPayouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white font-bold">{payout.id}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{payout.name}</p>
                  <p className="text-sm text-gray-400">{payout.date}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderCreateGroup = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentView("groups")}
          className="text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Create Group</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Group Name</label>
            <input 
              type="text" 
              placeholder="Group name"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Contribution Amount</label>
            <input 
              type="number" 
              placeholder="Amount"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Payment Frequency</label>
            <select className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white">
              <option value="">Select frequency</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Payout Schedule</label>
            <select className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white">
              <option value="">Select schedule</option>
              <option value="rotating">Rotating</option>
              <option value="random">Random</option>
              <option value="bidding">Bidding</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Group Size</label>
            <input 
              type="number" 
              placeholder="Number of members"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold mt-6">
            Create Group
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Tontine</h1>
        </div>

        {/* Main Content */}
        {currentView === "groups" && renderGroupDetails()}
        {currentView === "payments" && renderPaymentStatus()}
        {currentView === "schedule" && renderPayoutSchedule()}
        {currentView === "create" && renderCreateGroup()}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
          <div className="flex justify-around py-3">
            <button 
              onClick={() => setCurrentView("groups")}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === "groups" ? "text-green-400" : "text-gray-400"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>
            <button 
              onClick={() => setCurrentView("groups")}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === "groups" ? "text-green-400" : "text-gray-400"
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Groups</span>
            </button>
            <button 
              onClick={() => setCurrentView("payments")}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === "payments" ? "text-green-400" : "text-gray-400"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Payments</span>
            </button>
            <button 
              onClick={() => setCurrentView("schedule")}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === "schedule" ? "text-green-400" : "text-gray-400"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Schedule</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>

        {/* Floating Create Button */}
        {currentView === "groups" && (
          <Button 
            onClick={() => setCurrentView("create")}
            className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
