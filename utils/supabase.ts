// utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
export const createServerSupabaseClient = (cookies: Record<string, string>) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;

  console.log("Supabase URL:", supabaseUrl);

  return createClient(supabaseUrl, supabaseKey, {
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


// Simplified database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
        };
        Update: {
          email?: string;
          name?: string;
        };
      };
    };
  };
};

// SQL for initial Supabase setup:
/*
-- Create a profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view their own profile" 
on public.profiles for select 
using (auth.uid() = id);

create policy "Users can update their own profile" 
on public.profiles for update 
using (auth.uid() = id);

-- Create a trigger to create profile after signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
*/