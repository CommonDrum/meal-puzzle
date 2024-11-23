// islands/SignUpForm.tsx
import { useSignal } from "@preact/signals";
import { FormHeader } from "../components/FormHeader.tsx";
import { ErrorAlert } from "../components/ErrorAlert.tsx";
import { FormField } from "../components/FormField.tsx";
import { TermsCheckbox } from "../components/signup/TermsCheckbox.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export default function SignUpForm() {
  const formData = useSignal<SignUpData>({
    email: "",
    password: "",
    fullName: "",
  });
  const isLoading = useSignal(false);
  const error = useSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading.value = true;
    error.value = "";

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.value.email,
          password: formData.value.password,
          full_name: formData.value.fullName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up");
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
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            value={formData.value.fullName}
            onChange={handleChange}
            placeholder="John Doe"
          />

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
            hint="Must be at least 8 characters long"
          />

          <TermsCheckbox />
          <SubmitButton isLoading={isLoading.value} />
        </form>
      </div>
    </div>
  );
}