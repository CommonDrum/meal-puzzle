// components/signup/TermsCheckbox.tsx
export function TermsCheckbox() {
  return (
    <div class="flex items-start">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        required
        class="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
      />
      <label htmlFor="terms" class="ml-2 block text-sm text-gray-600">
        I agree to the{" "}
        <a href="/terms" class="font-medium text-gray-900 hover:text-gray-700">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" class="font-medium text-gray-900 hover:text-gray-700">
          Privacy Policy
        </a>
      </label>
    </div>
  );
}