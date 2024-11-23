// supabase.ts
import { createClient } from '@supabase/supabase-js'
import "jsr:@std/dotenv/load";

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")



export const supabase = createClient(supabaseUrl, supabaseKey)
