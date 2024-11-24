// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import CardIsland from "../islands/CardIsland.tsx";
import NavbarIsland from "../islands/NavbarIsland.tsx";

export default function Home(props: PageProps) {
  const user = props.state?.user;

  return (
    <>
      <Head>
        <title>Fresh Card System</title>
      </Head>
      <NavbarIsland user={user} />
      
      <main class="min-h-screen bg-gray-50">
        {!user ? (
          // Landing page content for non-authenticated users
          <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Welcome to</span>
                <span class="block text-indigo-600">Fresh Card System</span>
              </h1>
              <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Streamline your workflow with our powerful card management system. Organize, collaborate, and boost productivity in one place.
              </p>
              
              <div class="mt-10">
                <div class="rounded-lg shadow-lg sm:flex">
                  <div class="p-6 bg-white rounded-lg sm:p-8 w-full">
                    <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
                      {/* Feature 1 */}
                      <div class="text-center">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full">
                          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                          </svg>
                        </div>
                        <h3 class="mt-4 text-lg font-medium text-gray-900">Easy Organization</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Organize your cards with intuitive drag-and-drop interfaces
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div class="text-center">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full">
                          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                          </svg>
                        </div>
                        <h3 class="mt-4 text-lg font-medium text-gray-900">Team Collaboration</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Work together seamlessly with real-time updates
                        </p>
                      </div>

                      {/* Feature 3 */}
                      <div class="text-center">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full">
                          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <h3 class="mt-4 text-lg font-medium text-gray-900">Secure & Reliable</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Enterprise-grade security for your data
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
        ) : (
          // Dashboard content for authenticated users
          <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
              <h2 class="text-2xl font-semibold text-gray-900 mb-6">Your Dashboard</h2>
              <CardIsland />
            </div>
          </div>
        )}
      </main>
    </>
  );
}