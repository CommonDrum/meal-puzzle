// routes/about.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import NavbarIsland from "../islands/NavbarIsland.tsx";

export default function About({ url, state }: PageProps) {
  const user = state?.user;

  return (
    <>
      <Head>
        <title>About - Meal Puzzle</title>
      </Head>
      <NavbarIsland user={user} currentPath={url.pathname} />

      <main class="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div class="text-center mb-16">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              About Meal Puzzle
            </h1>
            <p class="mt-4 text-xl text-gray-600">
              Your AI-powered cooking companion for quick and personalized recipe ideas.
            </p>
          </div>

          {/* Mission Section */}
          <div class="prose prose-indigo mx-auto mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p class="text-lg text-gray-600">
              At Meal Puzzle, we're passionate about making cooking accessible, enjoyable, and 
              stress-free for everyone. Whether you're a beginner or an experienced cook, 
              our AI-powered platform helps you discover recipes that match your preferences, 
              dietary requirements, and available time.
            </p>
          </div>

          {/* Features Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-md mb-4">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Quick Ideas</h3>
              <p class="text-gray-600">
                Get instant recipe suggestions based on your preferences, available ingredients, 
                and time constraints. No more endless scrolling through recipe websites.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-md mb-4">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Personalized Experience</h3>
              <p class="text-gray-600">
                Set your dietary preferences, cooking skill level, and favorite cuisines. 
                Our AI understands your needs and suggests recipes accordingly.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-md mb-4">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Recipe Collection</h3>
              <p class="text-gray-600">
                Save your favorite recipes and organize them for easy access. Build your 
                personal cookbook with recipes you love.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-md mb-4">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
              <p class="text-gray-600">
                Our AI learns from your preferences and cooking history to provide 
                better recipe suggestions over time.
              </p>
            </div>
          </div>

          {/* Get Started Section */}
          <div class="text-center bg-indigo-50 rounded-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Ready to start cooking?
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Join Meal Puzzle today and discover a new way to plan your meals.
            </p>
            <a
              href="/signup"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-gray-100 py-12 px-4">
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-gray-500">
            © {new Date().getFullYear()} Meal Puzzle. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}