// routes/api/auth/signup.ts
import { Handlers } from "$fresh/server.ts";
import { createSupabaseClient } from "../../../utils/supabase.ts";
import { AuthResponse } from "../../../types/auth.ts";

const handler: Handlers = {
  async POST(req) {
    try {
      const { email, password, full_name } = await req.json();

      if (!email || !password || !full_name) {
        return new Response(
          JSON.stringify({ error: "All fields are required" }), 
          { status: 400 }
        );
      }

      if (password.length < 8) {
        return new Response(
          JSON.stringify({ error: "Password must be at least 8 characters long" }), 
          { status: 400 }
        );
      }

      const supabase = createSupabaseClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
          emailRedirectTo: `${new URL(req.url).origin}/auth/callback`,
        },
      });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }), 
          { status: 400 }
        );
      }

      const response: AuthResponse = {
        session: data.session,
        message: data.user && !data.session 
          ? "Please check your email to confirm your account" 
          : undefined
      };

      if (data.session) {
        const headers = new Headers();
        headers.set(
          "Set-Cookie",
          `auth-token=${data.session.access_token}; Path=/; HttpOnly; SameSite=Lax`
        );
        return new Response(JSON.stringify(response), { 
          status: 200, 
          headers 
        });
      }

      return new Response(JSON.stringify(response), { status: 200 });

    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500 }
      );
    }
  },
};

export { handler };