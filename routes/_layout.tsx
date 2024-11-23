import { PageProps } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div class="min-h-screen bg-gray-50">
      <Navbar user={state.session?.user} />
      <main class="pt-16">
        <Component />
      </main>
    </div>
  );
}