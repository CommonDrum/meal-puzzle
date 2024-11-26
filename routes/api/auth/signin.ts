// routes/api/auth/signin.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../../utils/supabase.ts";
import { AuthResponse } from "../../../types/auth.ts";

const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const email = form.get("email")?.toString();
      const password = form.get("password")?.toString();

      if (!email || !password) {
        return new Response("Email and password are required", { status: 400 });
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return new Response(error.message, { status: 400 });
      }

      // Set auth cookie
      const headers = new Headers();
      headers.set(
        "Set-Cookie",
        `auth-token=${data.session.access_token}; Path=/; HttpOnly; SameSite=Lax`
      );

      const response: AuthResponse = { session: data.session };
      return new Response(JSON.stringify(response), {
        status: 200,
        headers,
      });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  },
};

export { handler };