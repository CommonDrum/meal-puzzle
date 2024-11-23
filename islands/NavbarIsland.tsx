// islands/NavbarIsland.tsx
import { useState } from "preact/hooks";
import { User } from "@supabase/supabase-js";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface NavbarIslandProps {
  user?: User | null;
  isMobile?: boolean;
  links?: { href: string; text: string; }[];
}

export default function NavbarIsland({ user, isMobile, links = [] }: NavbarIslandProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Desktop Auth Section
  if (!isMobile) {
    return (
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
    );
  }

  // Mobile Menu
  return (
    <div class="flex md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            d={isMenuOpen 
              ? "M6 18L18 6M6 6l12 12" 
              : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div class="absolute top-16 left-0 right-0 bg-white border-b border-gray-100">
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
      )}
    </div>
  );
}