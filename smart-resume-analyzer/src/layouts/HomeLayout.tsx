// src/layouts/HomeLayout.tsx
import { Outlet } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton"; // Already imported
import { Github } from "lucide-react"; // Import a new icon if desired, e.g., for a GitHub link
import { Button } from "@/components/ui/button"; // Import Button if you want to use it for a brand icon/link

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground"> {/* Ensure full height and correct text/background colors */}
      <header className="sticky top-0 z-50 p-4 border-b bg-background/80 backdrop-blur-sm flex justify-between items-center shadow-sm h-16"> {/* Enhanced header */}
        <div className="flex items-center gap-3">
          {/* Option 1: Simple text logo */}
          <h1 className="text-2xl font-extrabold text-primary tracking-tight">
            Smart Resume Analyzer
          </h1>
          {/* Option 2: Icon + text logo (if you have a custom icon) 
          <Button variant="ghost" className="text-2xl font-extrabold text-primary tracking-tight p-0 h-auto">
            <svg /* Your custom AI icon here, or use Lucide icon *//>
            Smart Analyzer
          </Button>
          */}
        </div>
        <div className="flex items-center gap-4">
          {/* Optional: Add a link to GitHub or other resources */}
          <a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
          <LogoutButton /> {/* Existing LogoutButton */}
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6 lg:p-8"> {/* Use Tailwind's container for consistent main content width */}
        <Outlet />
      </main>
    </div>
  );
}