// utils/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { Session } from "@supabase/supabase-js";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;

export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseKey);
};