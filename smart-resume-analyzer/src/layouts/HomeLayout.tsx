// src/layouts/HomeLayout.tsx
import { Outlet } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-lg font-bold">Smart Resume Analyzer</h1>
        <LogoutButton />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
