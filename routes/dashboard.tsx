// routes/dashboard.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Layout } from "../components/Layout.tsx";
import CardIsland from "../islands/CardIsland.tsx";

export default function Dashboard({ url, state }: PageProps) {
  const user = state?.user;

  return (
    <>
      <Head>
        <title>Dashboard - Meal Puzzle</title>
      </Head>
      <Layout user={user} currentPath={url.pathname}>
        <div class="bg-gray-50">
          <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div class="px-4 sm:px-0">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 class="text-2xl font-bold text-gray-900">
                  Recipe Dashboard
                </h1>
                <div class="mt-4 sm:mt-0">
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg 
                      class="-ml-1 mr-2 h-5 w-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    New Recipe
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {/* Total Recipes */}
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg 
                          class="h-6 w-6 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            Total Recipes
                          </dt>
                          <dd class="text-lg font-semibold text-gray-900">
                            12
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generated This Week */}
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <svg 
                          class="h-6 w-6 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            Generated This Week
                          </dt>
                          <dd class="text-lg font-semibold text-gray-900">
                            5
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Favorite Recipes */}
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
                        <svg 
                          class="h-6 w-6 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            Favorite Recipes
                          </dt>
                          <dd class="text-lg font-semibold text-gray-900">
                            3
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div class="px-4 sm:px-0">
              <CardIsland />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}