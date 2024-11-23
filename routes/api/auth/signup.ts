// routes/api/auth/signup.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../../utils/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return new Response(null, {
        status: 303,
        headers: { Location: `/signup?error=${error.message}` }
      });
    }

    // Handle email confirmation case
    if (!data.session) {
      return new Response(null, {
        status: 303,
        headers: { Location: `/signup/confirmation?email=${email}` }
      });
    }

    // Direct login if email confirmation is disabled
    return new Response(null, {
      status: 303,
      headers: {
        "Set-Cookie": `sb-token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
        "Location": "/"
      }
    });
  }
};