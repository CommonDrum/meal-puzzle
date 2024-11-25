// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import NavbarIsland from "../islands/NavbarIsland.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Meal Puzzle - Get cooking ideas quick</title>
      </Head>
      <NavbarIsland />
      
      <main class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">Welcome to</span>
              <span class="block text-indigo-600">Meal Puzzle</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get instant, personalized recipe ideas based on your preferences. From quick meals to gourmet dishes, find your next cooking adventure.
            </p>
            
            <div class="mt-10">
              <div class="rounded-lg shadow-lg sm:flex">
                <div class="p-6 bg-white rounded-lg sm:p-8 w-full">
                  <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    {/* Feature 1 */}
                    <div class="text-center">
                      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full">
                        <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                        </svg>
                      </div>
                      <h3 class="mt-4 text-lg font-medium text-gray-900">Personalized Recipes</h3>
                      <p class="mt-2 text-base text-gray-500">
                        Get recipes tailored to your dietary preferences and skill level
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div class="text-center">
                      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full">
                        <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <h3 class="mt-4 text-lg font-medium text-gray-900">Quick Ideas</h3>
                      <p class="mt-2 text-base text-gray-500">
                        Get instant recipe suggestions when you're short on time
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div class="text-center">
                      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full">
                        <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                      </div>
                      <h3 class="mt-4 text-lg font-medium text-gray-900">Save Favorites</h3>
                      <p class="mt-2 text-base text-gray-500">
                        Keep your favorite recipes organized in one place
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-10 space-x-4">
                <a href="/login" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </a>
                <a href="/about" class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}