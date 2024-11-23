import "jsr:@std/dotenv/load";
import { createClient } from "@supabase/supabase-js";

// Debug log to check environment variables
console.log("Supabase Config:", {
  url: Deno.env.get("SUPABASE_URL"),
  keyExists: !!Deno.env.get("SUPABASE_ANON_KEY")
});

export const createServerSupabaseClient = (cookies: Record<string, string>) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Environment variables not found. Make sure to set SUPABASE_URL and SUPABASE_ANON_KEY"
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        cookie: Object.entries(cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join("; "),
      },
    },
  });
};