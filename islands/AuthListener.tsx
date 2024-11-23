// islands/AuthListener.tsx
import { useEffect } from "preact/hooks";
import { supabase } from "../utils/supabase.ts";

export default function AuthListener() {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      if (event === 'SIGNED_OUT') {
        window.location.href = '/signin';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
}