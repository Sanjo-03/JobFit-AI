import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed");
    } else {
      toast.success("Logged out");
      localStorage.clear();
      navigate("/auth"); // redirect to login page
    }
  };

  return (
    <Button variant="ghost" onClick={handleLogout} className="text-sm flex items-center gap-2">
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
