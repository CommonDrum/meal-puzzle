// routes/auth/callback.ts
// This handles the email confirmation redirect from Supabase
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const error_description = url.searchParams.get('error_description');

    if (error) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/signup/confirmation?error=${encodeURIComponent(error_description || error)}`,
        },
      });
    }

    if (!code) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/signup/confirmation?error=No confirmation code provided',
        },
      });
    }

    try {
      const supabase = ctx.state.supabase;
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        throw error;
      }

      // Set session cookie and redirect to dashboard
      const headers = new Headers({
        Location: '/dashboard',
      });

      if (data.session?.access_token) {
        headers.set(
          'Set-Cookie',
          `sb-access-token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`
        );
      }

      return new Response(null, {
        status: 303,
        headers,
      });
    } catch (err) {
      console.error('Error confirming email:', err);
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/signup/confirmation?error=${encodeURIComponent('Failed to confirm email')}`,
        },
      });
    }
  },
};