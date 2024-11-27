// components/signup/ErrorAlert.tsx
interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null;
  
  return (
    <div class="bg-red-50 border border-red-100 rounded-lg p-4">
      <div class="flex items-start">
        <svg
          class="w-5 h-5 text-red-500 mt-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p class="ml-3 text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}