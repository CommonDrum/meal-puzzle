// islands/NavbarIsland.tsx
import { useState } from "preact/hooks";
import { Logo } from "../components/navbar/Logo.tsx";
import { Navigation } from "../components/navbar/Navigation.tsx";
import { UserMenu } from "../components/navbar/UserMenu.tsx";
import { AuthButtons } from "../components/navbar/AuthButtons.tsx";

interface NavbarProps {
  user?: {
    email: string;
    user_metadata?: {
      full_name?: string;
    };
  };
  currentPath?: string;
}

export default function NavbarIsland({ user: initialUser, currentPath = "/" }: NavbarProps) {
  const [user, setUser] = useState(initialUser);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(undefined);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Get user's name from metadata or use email as fallback
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <header class="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div class="max-w-6xl mx-auto">
        <nav class="flex items-center justify-between h-16 px-4">
          <Logo />
          <Navigation currentPath={currentPath} />
          
          {user ? (
            <UserMenu
              name={displayName}
              isOpen={isUserMenuOpen}
              onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
              onSignOut={handleSignOut}
            />
          ) : (
            <AuthButtons />
          )}
        </nav>
      </div>
    </header>
  );
}