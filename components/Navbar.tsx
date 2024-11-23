// components/Navbar.tsx
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { User } from "@supabase/supabase-js";

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

            {/* Auth section */}
            <div class="flex items-center gap-4">
              {user ? (
                <>
                  <a 
                    href="/dashboard" 
                    class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Dashboard
                  </a>
                  <form method="POST" action="/api/auth/signout">
                    <button 
                      class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                      disabled={!IS_BROWSER}
                    >
                      Sign Out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <a 
                    href="/signin" 
                    class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </a>
                  <a 
                    href="/signup"
                    class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div class="flex md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-label="Toggle menu"
            >
              <svg
                class="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel - You might want to make this an island for interactivity */}
        <div class="hidden md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {link.text}
              </a>
            ))}
            
            {user ? (
              <>
                <a 
                  href="/dashboard"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Dashboard
                </a>
                <form method="POST" action="/api/auth/signout">
                  <button 
                    class="w-full mt-4 px-3 py-2 text-left text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    disabled={!IS_BROWSER}
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <a 
                  href="/signin"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </a>
                <a 
                  href="/signup"
                  class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}