import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { createServerSupabaseClient } from "../utils/supabase.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext
) {
  const cookies = getCookies(req.headers);
  const supabase = createServerSupabaseClient(cookies);
  
  const { data: { session } } = await supabase.auth.getSession();

  ctx.state.session = session;
  ctx.state.supabase = supabase;

  // Check protected routes
  const isProtectedRoute = req.url.includes('/dashboard');
  
  if (isProtectedRoute && !session) {
    const redirect = new URL(req.url).pathname;
    return new Response(null, {
      status: 302,
      headers: { Location: `/signin?redirect=${redirect}` }
    });
  }

  return await ctx.next();
}