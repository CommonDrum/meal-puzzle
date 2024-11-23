// components/Navbar.tsx
import { JSX } from "preact";
import { User } from "@supabase/supabase-js";
import NavbarIsland from "../islands/NavbarIsland.tsx";

interface NavbarProps {
  user?: User | null;
}

export default function Navbar({ user }: NavbarProps): JSX.Element {
  const links = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
  ];

  return (
    <nav class="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 fixed top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="/" 
            class="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <span class="font-semibold text-lg tracking-tight">PuzzleMeal</span>
          </a>

          {/* Desktop Navigation */}
          <div class="hidden md:flex items-center gap-8">
            {/* Main navigation links */}
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.text}
              </a>
            ))}

            {/* Auth section - rendered by Island */}
            <NavbarIsland user={user} />
          </div>

          {/* Mobile Menu - handled by Island */}
          <NavbarIsland user={user} isMobile={true} links={links} />
        </div>
      </div>
    </nav>
  );
}