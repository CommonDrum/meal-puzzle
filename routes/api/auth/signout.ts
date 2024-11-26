// routes/api/auth/signout.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../../utils/supabase.ts";

const handler: Handlers = {
  async POST(req) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }), 
          { status: 400 }
        );
      }

      // Clear all auth-related cookies
      const cookiesToClear = [
        'auth-token',
        'sb-access-token',
        'sb-refresh-token'
      ];

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      // Set expired cookies
      cookiesToClear.forEach(cookieName => {
        headers.append(
          'Set-Cookie',
          `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Expires=${new Date(0).toUTCString()}`
        );
      });

      return new Response(
        JSON.stringify({ 
          success: true,
          message: "Successfully signed out" 
        }), 
        { 
          status: 200,
          headers 
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: error instanceof Error ? error.message : "Failed to sign out" 
        }), 
        { status: 500 }
      );
    }
  },
};

export { handler };