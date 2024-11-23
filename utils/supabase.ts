// utils/supabase.ts
import "jsr:@std/dotenv/load";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);