import { useState } from "preact/hooks";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Connection failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-lg space-y-8">
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p class="text-sm text-gray-500">
            Sign in to access your account
          </p>
        </div>

        {error && (
          <div class="bg-red-50 p-4 rounded-lg flex items-start space-x-3">
            <svg 
              class="w-5 h-5 text-red-500 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p class="text-sm text-red-500">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} class="space-y-6">
          <div class="space-y-1">
            <label 
              for="email" 
              class="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
                       bg-white shadow-sm placeholder-gray-400 focus:outline-none
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                       transition duration-200"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({
                  ...formData,
                  email: (e.target as HTMLInputElement).value
                })}
              />
            </div>
          </div>

          <div class="space-y-1">
            <label 
              for="password" 
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0110 0v4"></path>
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
                       bg-white shadow-sm placeholder-gray-400 focus:outline-none
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                       transition duration-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({
                  ...formData,
                  password: (e.target as HTMLInputElement).value
                })}
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" class="text-sm text-blue-500 hover:text-blue-600">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent 
                   rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {isLoading ? (
              <>
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div class="text-center">
          <p class="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" class="font-medium text-blue-500 hover:text-blue-600">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};