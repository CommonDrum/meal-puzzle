// routes/api/auth/google.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(_req, ctx) {
    const supabase = ctx.state.supabase;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${new URL(_req.url).origin}/dashboard`,
      },
    });

    if (error) {
      return new Response(error.message, { status: 400 });
    }

    // Redirect to Supabase's OAuth URL
    return Response.redirect(data.url);
  },
};