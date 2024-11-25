// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { createSupabaseClient } from "../utils/supabase.ts";

interface State {
  user?: {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  } | null;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>
) {
  try {
    const authCookie = req.headers.get("cookie")?.match(/(?<=auth-token=)[^;]+/)?.[0];
    const supabaseCookie = req.headers.get("cookie")?.match(/(?<=sb-access-token=)[^;]+/)?.[0];
    
    const authToken = authCookie || supabaseCookie;
    const url = new URL(req.url);
    const isHomePage = url.pathname === "/";

    if (authToken) {
      const supabase = createSupabaseClient();
      const { data: { user }, error } = await supabase.auth.getUser(authToken);

      if (user && !error) {
        // Add user to state if found
        ctx.state.user = user;

        // Redirect from home to dashboard if authenticated
        if (isHomePage) {
          return new Response(null, {
            status: 303,
            headers: {
              Location: "/dashboard",
            },
          });
        }
      } else if (error) {
        // If token is invalid, clear the cookies
        const response = await ctx.next();
        const newHeaders = new Headers(response.headers);
        
        ['auth-token', 'sb-access-token', 'sb-refresh-token'].forEach(cookieName => {
          newHeaders.append(
            'Set-Cookie',
            `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Expires=${new Date(0).toUTCString()}`
          );
        });

        return new Response(response.body, {
          status: response.status,
          headers: newHeaders,
        });
      }
    }

    // Handle auth-required routes
    const isAuthRoute = req.url.includes('/api/auth/');
    const isProtectedRoute = req.url.includes('/dashboard') || 
                           req.url.includes('/profile');

    if (isProtectedRoute && !ctx.state.user) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/login?redirect=${encodeURIComponent(req.url)}`,
        },
      });
    }

    // Prevent authenticated users from accessing login/signup pages
    const isAuthPage = req.url.includes('/login') || 
                      req.url.includes('/signup');
    
    if (isAuthPage && ctx.state.user && !isAuthRoute) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/dashboard',
        },
      });
    }

    const response = await ctx.next();
    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    
    // Don't redirect API routes on error
    if (req.url.includes('/api/')) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }), 
        { status: 500 }
      );
    }

    // Redirect to login for other routes
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/login?error=${encodeURIComponent('Session expired')}`,
      },
    });
  }
}