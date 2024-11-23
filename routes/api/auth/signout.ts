// routes/api/auth/signout.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../../utils/supabase.ts";

export const handler: Handlers = {
  async POST(_req) {
    await supabase.auth.signOut();

    return new Response(null, {
      status: 303,
      headers: {
        "Set-Cookie": "sb-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
        "Location": "/signin"
      }
    });
  }
};