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

interface ValidationError {
  field: string;
  message: string;
}

export default function SignUpForm() {
  const formData = useSignal<SignUpData>({
    email: "",
    password: "",
    fullName: "",
  });
  const isLoading = useSignal(false);
  const error = useSignal("");
  const termsAccepted = useSignal(false);

  const validateForm = (): ValidationError | null => {
    if (!formData.value.fullName.trim()) {
      return { field: "fullName", message: "Name is required" };
    }
    if (!formData.value.email.trim()) {
      return { field: "email", message: "Email is required" };
    }
    if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
      return { field: "email", message: "Please enter a valid email address" };
    }
    if (!formData.value.password) {
      return { field: "password", message: "Password is required" };
    }
    if (formData.value.password.length < 8) {
      return { field: "password", message: "Password must be at least 8 characters long" };
    }
    if (!termsAccepted.value) {
      return { field: "terms", message: "You must accept the terms and conditions" };
    }
    return null;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      error.value = validationError.message;
      return;
    }

    isLoading.value = true;
    error.value = "";

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.value.email.trim(),
          password: formData.value.password,
          full_name: formData.value.fullName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up");
      }

      if (data.session) {
        window.location.href = "/dashboard";
      } else if (data.message) {
        window.location.href = "/verify-email";
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "An error occurred";
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
    // Clear error when user starts typing
    if (error.value) {
      error.value = "";
    }
  };

  return (
    <div class="min-h-screen bg-white/80 backdrop-blur-sm flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <FormHeader
          caption="Create your account"
          subCaption="Already have an account?"
          linkText="Sign in"
          linkHref="/login"
        />

        {error.value && <ErrorAlert message={error.value} />}

        <form onSubmit={handleSubmit} class="mt-8 space-y-6">
          <FormField
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            value={formData.value.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            autocomplete="name"
          />

          <FormField
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={formData.value.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            autocomplete="email"
          />

          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.value.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autocomplete="new-password"
            hint="Must be at least 8 characters long"
          />

          <div class="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted.value}
              onChange={(e) => {
                termsAccepted.value = (e.target as HTMLInputElement).checked;
                if (error.value.includes("terms")) {
                  error.value = "";
                }
              }}
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I accept the{" "}
              <a href="/terms" class="text-indigo-600 hover:text-indigo-500">
                Terms and Conditions
              </a>
            </label>
          </div>

          <SubmitButton 
            isLoading={isLoading.value} 
            caption="Create Account" 
          />
        </form>
      </div>
    </div>
  );
}