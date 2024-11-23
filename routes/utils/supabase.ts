
import { createClient } from "@supabase/supabase-js";

const url = Deno.env.get("SUPABASE_URL")!;
const key = Deno.env.get("SUPABASE_KEY")!;

export const supabase = createClient(url, key);