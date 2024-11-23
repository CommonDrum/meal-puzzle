// routes/auth/signout.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../../utils/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return new Response(error.message, { status: 400 });
    }

    // Clear auth cookie
    const response = new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
    response.headers.set(
      "Set-Cookie",
      "sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
    );

    return response;
  },
};