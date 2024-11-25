// routes/dashboard.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import NavbarIsland from "../islands/NavbarIsland.tsx";
import CardIsland from "../islands/CardIsland.tsx";

export default function Dashboard({ state }: PageProps) {
  const user = state?.user;

  return (
    <>
      <Head>
        <title>Dashboard - Meal Puzzle</title>
      </Head>
      <NavbarIsland user={user} />
      
      <main class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Your Recipe Dashboard</h2>
            <CardIsland />
          </div>
        </div>
      </main>
    </>
  );
}