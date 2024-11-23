import { h } from "preact";
import { useState } from "preact/hooks";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

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

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      {error && <p class="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        class="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}