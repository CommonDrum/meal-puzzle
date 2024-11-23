import { createClient } from "@supabase/supabase-js";

const url = Deno.env.get("SUPABASE_URL");
const key = Deno.env.get("SUPABASE_KEY");

if (!url || !key) {
  throw new Error("SUPABASE_URL and SUPABASE_KEY environment variables are required.");
}

export const supabase = createClient(url, key);