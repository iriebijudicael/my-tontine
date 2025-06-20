
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    // Simulate authentication and navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Hero content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Join a Tontine and Grow Your Savings
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Participate in a community saving group, achieve your financial goals, and celebrate collective success.
              </p>
            </div>
            
            {/* Illustration placeholder */}
            <div className="mb-8 p-8 bg-yellow-100 rounded-2xl max-w-md mx-auto lg:mx-0">
              <div className="flex justify-center items-center space-x-4">
                <div className="w-16 h-20 bg-orange-400 rounded-lg flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-20 bg-red-400 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-20 bg-blue-400 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-20 bg-purple-400 rounded-lg flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold"
                onClick={() => navigate("/dashboard")}
              >
                Register
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-xl font-semibold"
                onClick={() => setIsLogin(true)}
              >
                Log In
              </Button>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="w-full lg:w-96">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-white">
                  {isLogin ? "Welcome Back" : "Get Started"}
                </CardTitle>
                <p className="text-center text-gray-400">
                  {isLogin ? "Sign in to your account" : "Create your account"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Input 
                    placeholder="Email" 
                    type="email"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Input 
                    placeholder="Password" 
                    type="password"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {!isLogin && (
                    <Input 
                      placeholder="Confirm Password" 
                      type="password"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  )}
                </div>

                {isLogin && (
                  <div className="text-right">
                    <a href="#" className="text-green-400 text-sm hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
                  onClick={handleAuth}
                >
                  {isLogin ? "Log In" : "Register"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Google
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Facebook
                  </Button>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-green-400 hover:underline text-sm"
                  >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
