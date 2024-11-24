// components/signup/SubmitButton.tsx
interface SubmitButtonProps {
  isLoading: boolean;
  caption: string;
}

export function SubmitButton({ isLoading, caption }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg 
             shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
             disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <div class="flex items-center">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Creating account...
        </div>
      ) : (
        caption
      )}
    </button>
  );
}