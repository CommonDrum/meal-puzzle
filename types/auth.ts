// types/auth.ts
import { Session } from "@supabase/supabase-js";

export interface AuthResponse {
  session: Session | null;
  error?: string;
  message?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  fullName?: string;
  terms?: string;
}