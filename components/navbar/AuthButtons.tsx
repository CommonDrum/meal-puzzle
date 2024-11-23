// components/navbar/AuthButtons.tsx
export function AuthButtons() {
  return (
    <div class="flex items-center space-x-3">
      <a 
        href="/signin" 
        class="text-sm text-gray-600 hover:text-gray-900"
      >
        Sign in
      </a>
      <a 
        href="/signup" 
        class="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Get Started
      </a>
    </div>
  );
}