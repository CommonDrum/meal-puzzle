// routes/auth/signin.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../../utils/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const email = form.get("email")?.toString();
      const password = form.get("password")?.toString();

      if (!email || !password) {
        return new Response("Email and password required", { status: 400 });
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Create response with auth cookie
      const response = new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });

      // Set auth cookie
      if (data.session) {
        const cookieStr = `sb-access-token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`;
        response.headers.set("Set-Cookie", cookieStr);
      }

      return response;
    } catch (error) {
      return new Response(error.message, { status: 400 });
    }
  },
};