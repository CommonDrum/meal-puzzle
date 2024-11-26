import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { supabase } from "../utils/supabase.ts";

// Type definitions for better type safety
interface UserMetadata {
  full_name?: string;
}

interface User {
  id: string;
  email?: string;
  user_metadata?: UserMetadata;
}

interface State {
  user: User | null;
}

// Route configuration
const ROUTES = {
  protected: ['/dashboard', '/profile', '/preferences'],
  auth: ['/login', '/signup'],
  api: '/api',
  home: '/',
} as const;

// Cookie configuration
const COOKIE_NAMES = ['auth-token', 'sb-access-token', 'sb-refresh-token'] as const;

// Custom error types
class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// Helper functions
function isProtectedRoute(pathname: string): boolean {
  return ROUTES.protected.some(route => pathname.startsWith(route));
}

function isAuthPage(pathname: string): boolean {
  return ROUTES.auth.some(route => pathname.startsWith(route));
}

function clearAuthCookies(headers: Headers): void {
  COOKIE_NAMES.forEach(cookieName => {
    headers.append(
      'Set-Cookie',
      `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Expires=${new Date(0).toUTCString()}`
    );
  });
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>
) {
  try {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const isHomePage = pathname === ROUTES.home;
    const isAuthRoute = pathname.startsWith(`${ROUTES.api}/auth/`);

    // Extract auth token from cookies
    const cookies = getCookies(req.headers);
    const authToken = cookies["auth-token"] || cookies["sb-access-token"];

    // Authenticate user if token exists
    if (authToken) {
      const { data: { user }, error } = await supabase.auth.getUser(authToken);

      if (user && !error) {
        ctx.state.user = user;
        
        // Redirect authenticated users from home to dashboard
        if (isHomePage) {
          return new Response(null, {
            status: 303,
            headers: { Location: "/dashboard" },
          });
        }
      } else if (error) {
        // Handle invalid/expired token
        const response = await ctx.next();
        const newHeaders = new Headers(response.headers);
        clearAuthCookies(newHeaders);
        
        throw new AuthError('Invalid or expired token');
      }
    }

    // Handle protected routes
    if (isProtectedRoute(pathname) && !ctx.state.user) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/login?redirect=${encodeURIComponent(req.url)}`,
        },
      });
    }

    // Redirect authenticated users away from auth pages
    if (isAuthPage(pathname) && ctx.state.user && !isAuthRoute) {
      return new Response(null, {
        status: 303,
        headers: { Location: '/dashboard' },
      });
    }

    // Process the request
    const response = await ctx.next();
    return response;

  } catch (error) {
    // Handle errors based on route type
    if (error instanceof AuthError || error instanceof Error) {
      if (pathname.startsWith(ROUTES.api)) {
        return new Response(
          JSON.stringify({ 
            error: 'Authentication error',
            message: error.message 
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      // Redirect to login with error message for non-API routes
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/login?error=${encodeURIComponent(error.message || 'Session expired')}`,
        },
      });
    }

    // Handle unexpected errors
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}