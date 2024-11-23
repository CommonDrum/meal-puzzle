// components/login/RememberMe.tsx
export function RememberMe() {
  return (
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          class="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
        />
        <label htmlFor="remember" class="ml-2 block text-sm text-gray-600">
          Remember me
        </label>
      </div>
      <a href="/forgot-password" class="text-sm text-gray-900 hover:text-gray-700">
        Forgot password?
      </a>
    </div>
  );
}