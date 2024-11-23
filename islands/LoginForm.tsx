// islands/LoginForm.tsx
import { useSignal } from "@preact/signals";
import { FormHeader } from "../components/FormHeader.tsx";
import { ErrorAlert } from "../components/ErrorAlert.tsx";
import { FormField } from "../components/FormField.tsx";
import { RememberMe } from "../components/login/RememberMe.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const formData = useSignal<LoginData>({
    email: "",
    password: "",
  });
  const isLoading = useSignal(false);
  const error = useSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading.value = true;
    error.value = "";

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.value.email,
          password: formData.value.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      window.location.href = "/";
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const handleChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    formData.value = {
      ...formData.value,
      [name]: value,
    };
  };

  return (
    <div class="min-h-screen bg-white/80 backdrop-blur-sm flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <FormHeader />
        <ErrorAlert message={error.value} />
        
        <form onSubmit={handleSubmit} class="mt-8 space-y-6">
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={formData.value.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.value.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <RememberMe />
          <SubmitButton isLoading={isLoading.value} />
        </form>
      </div>
    </div>
  );
}