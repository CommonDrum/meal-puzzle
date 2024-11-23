// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { supabase } from "../utils/supabase.ts";

export async function handler(req: Request, ctx: FreshContext) {
  // Get token from cookie
  const token = req.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-token='))
    ?.split('=')[1];

  if (token) {
    const { data: { user } } = await supabase.auth.getUser(token);
    ctx.state.user = user;
  }

  return await ctx.next();
}