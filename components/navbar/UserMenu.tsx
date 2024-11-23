// components/navbar/UserMenu.tsx
interface UserMenuProps {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
  onSignOut: () => void;
}

export function UserMenu({ name, isOpen, onToggle, onSignOut }: UserMenuProps) {
  return (
    <div class="relative">
      <button
        onClick={onToggle}
        class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span class="text-sm text-gray-600">
          Hi, {name}
        </span>
        <svg
          class={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div class="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-100">
          <a 
            href="/profile" 
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Profile Settings
          </a>
          <a 
            href="/account" 
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Account
          </a>
          <hr class="my-1 border-gray-100" />
          <button
            onClick={onSignOut}
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}