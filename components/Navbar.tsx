// components/Navbar.tsx (Static version for SEO and initial render)
interface NavbarProps {
  user?: {
    email: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav class="bg-white shadow-lg mb-4">
      <div class="max-w-screen-md mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="text-xl font-bold">
          Fresh Card System
        </a>
        <div class="flex items-center gap-4">
          {user ? (
            <div class="flex items-center gap-3">
              <span class="flex items-center">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span class="text-sm text-gray-600">{user.email}</span>
              </span>
              <button
                disabled
                class="text-sm bg-red-500 text-white px-3 py-1 rounded opacity-50 cursor-not-allowed"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <a
              href="/signin"
              class="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}