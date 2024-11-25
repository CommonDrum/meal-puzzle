// components/signup/TermsCheckbox.tsx
interface TermsCheckboxProps {
  checked: boolean;
  onChange: (e: Event) => void;
  error?: string;
}

export function TermsCheckbox({ checked, onChange, error }: TermsCheckboxProps) {
  return (
    <div class="space-y-2">
      <div class="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label for="terms" class="ml-2 block text-sm text-gray-900">
          I accept the{" "}
          <a href="/terms" class="text-indigo-600 hover:text-indigo-500">
            Terms and Conditions
          </a>
        </label>
      </div>
      {error && (
        <p class="text-sm text-red-600" id="terms-error">
          {error}
        </p>
      )}
    </div>
  );
}