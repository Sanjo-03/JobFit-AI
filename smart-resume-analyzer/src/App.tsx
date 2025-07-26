import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "./lib/supabaseClient";

// Pages
import UploadResume from "./pages/UploadResume";
import JobDescription from "./pages/JobDescription";
import Results from "./pages/Results";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

// Layout
import LogoutButton from "@/components/LogoutButton";

const queryClient = new QueryClient();

// Layout for authenticated routes
const HomeLayout = () => (
  <div className="min-h-screen bg-background">
    <header className="p-4 border-b flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">Smart Resume Analyzer</h1>
      <LogoutButton />
    </header>
    <main className="p-4">
      <Outlet />
    </main>
  </div>
);

// Auth check wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);
    };
    getUser();
  }, []);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!user) return <Navigate to="/auth" />;

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Auth Route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected App Layout */}
          <Route
            element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<UploadResume />} />
            <Route path="/job-description" element={<JobDescription />} />
            <Route path="/results" element={<Results />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
