// routes/preferences.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Layout } from "../components/Layout.tsx";
import PreferencesIsland from "../islands/PreferencesIsland.tsx";

export default function Preferences({ url, state }: PageProps) {
  const user = state?.user;

  return (
    <>
      <Head>
        <title>Preferences - Meal Puzzle</title>
      </Head>
      <Layout user={user} currentPath={url.pathname}>
        <div class="bg-gray-50">
          <div class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
              <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    Cooking Preferences
                  </h2>
                  <PreferencesIsland />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}