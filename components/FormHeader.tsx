// components/signup/FormHeader.tsx
export function FormHeader() {
  return (
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
      <p class="mt-2 text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/signin" class="font-medium text-gray-900 hover:text-gray-700">
          Sign in
        </a>
      </p>
    </div>
  );
}
