// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { supabase } from "../utils/supabase.ts";

export async function handler(req: Request, ctx: FreshContext) {
  // Get auth token from cookie
  const headers = new Headers(req.headers);
  const authToken = req.headers.get("cookie")?.match(/(?<=sb-access-token=)[^;]+/)?.[0];

  if (authToken) {
    // Set auth token in supabase client
    const { data: { user }, error } = await supabase.auth.getUser(authToken);
    
    // Add user to state if found
    if (user && !error) {
      ctx.state.user = user;
    }
  }

  const response = await ctx.next();
  return response;
}