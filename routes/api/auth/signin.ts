// routes/api/auth/signin.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../../utils/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return new Response(null, {
        status: 303,
        headers: { Location: `/signin?error=${error.message}` }
      });
    }

    return new Response(null, {
      status: 303,
      headers: {
        "Set-Cookie": `sb-token=${data.session?.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
        "Location": "/"
      }
    });
  }
};