// routes/login.tsx
import { PageProps } from "$fresh/server.ts";
import LoginForm from "../islands/LoginForm.tsx";

export default function LoginPage(props: PageProps) {
  return (
    <div class="p-4 max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <LoginForm />
    </div>
  );
}