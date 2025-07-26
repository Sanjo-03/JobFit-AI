import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Define keyframes for fade-in animation
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
`;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    let error = null;

    if (isLogin) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      error = signInError;
    } else {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      error = signUpError;
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isLogin ? "Logged in successfully!" : "Signed up successfully! Please check your email for verification.");
      if (isLogin) {
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 text-foreground">
        <Card className="w-full max-w-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg rounded-2xl animate-fade-in-up">
          <CardHeader className="text-center space-y-4 pt-8">
            <CardTitle className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              {isLogin ? "Welcome Back" : "Join Us"}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {isLogin ? "Sign in to access your account" : "Create an account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 sm:px-8 pb-8">
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-base rounded-lg bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 text-base rounded-lg bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 transition-all duration-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                  </span>
                ) : (
                  isLogin ? "Sign In" : "Sign Up"
                )}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(false)}
                    className="p-0 h-auto text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(true)}
                    className="p-0 h-auto text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold transition-colors duration-200"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;