// components/Navbar.tsx
import { asset } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { useState } from "preact/hooks";

interface NavbarProps {
  active?: string;
}

export default function Navbar({ active }: NavbarProps): JSX.Element {
  const links = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/projects", text: "Projects" },
    { href: "/contact", text: "Contact" },
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
            <img
              src={asset("/logo.svg")}
              alt="Logo"
              class="w-8 h-8"
            />
            <span class="font-semibold text-lg tracking-tight">Your Brand</span>
          </a>

          {/* Desktop Navigation */}
          <div class="hidden md:block">
            <ul class="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    class={`relative py-2 text-sm font-medium transition-colors
                      ${
                        active === link.href
                          ? "text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }
                      ${
                        active === link.href
                          ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-gray-900 after:rounded-full"
                          : ""
                      }
                    `}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div class="hidden md:flex items-center gap-4">
            <a 
              href="/login" 
              class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </a>
            <a 
              href="/signup" 
              class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-colors"
            >
              Get started
            </a>
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
      </div>

      {/* Mobile Menu Panel */}
      <div class="hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                active === link.href
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.text}
            </a>
          ))}
          <div class="pt-4 space-y-2">
            <a
              href="/login"
              class="block w-full px-3 py-2 text-center text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              Sign in
            </a>
            <a
              href="/signup"
              class="block w-full px-3 py-2 text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}