// routes/api/preferences.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../utils/supabase.ts";

interface UserPreferences {
  dietary_restrictions: string[];
  cooking_skill: 'beginner' | 'intermediate' | 'advanced';
  preferred_cuisines: string[];
  default_servings: number;
  allergies: string[];
  max_cooking_time: number;
  metric_units: boolean;
}

const defaultPreferences: UserPreferences = {
  dietary_restrictions: [],
  cooking_skill: 'beginner',
  preferred_cuisines: [],
  default_servings: 2,
  allergies: [],
  max_cooking_time: 60,
  metric_units: true
};

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      console.log("GET Auth state:", {
        hasUser: !!ctx.state.user,
        userId: ctx.state.user?.id,
      });

      if (!ctx.state.user?.id) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', ctx.state.user.id)
        .single();

      console.log("GET query result:", { data, error });

      if (error) {
        throw error;
      }

      // Return either the found preferences or default preferences
      const preferences = data || defaultPreferences;
      
      return new Response(JSON.stringify(preferences), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("GET preferences error:", error);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: error.message.includes("Not authenticated") ? 401 : 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  },

  async POST(req, ctx) {
    try {
      if (!ctx.state.user?.id) {
        throw new Error("Not authenticated");
      }

      const userId = ctx.state.user.id;
      const preferences = await req.json();
      console.log("Received preferences:", preferences);


      // Prepare preference data with user_id
      const preferenceData = {
        user_id: userId,
        dietary_restrictions: preferences.dietary_restrictions || [],
        cooking_skill: preferences.cooking_skill || 'beginner',
        preferred_cuisines: preferences.preferred_cuisines || [],
        default_servings: preferences.default_servings || 2,
        allergies: preferences.allergies || [],
        max_cooking_time: preferences.max_cooking_time || 60,
        metric_units: preferences.metric_units ?? true,
        updated_at: new Date().toISOString()
      };

      // Use upsert instead of separate insert/update
      const { error } = await supabase
        .from('user_preferences')
        .upsert(preferenceData, {
          onConflict: 'user_id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error("Operation error:", error);
        throw error;
      }

      return new Response(JSON.stringify({ 
        success: true,
        data: preferenceData
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("POST preferences error:", error);
      return new Response(JSON.stringify({ 
        error: error.message,
        type: error.message.includes("Not authenticated") ? "AuthError" : "OperationError"
      }), { 
        status: error.message.includes("Not authenticated") ? 401 : 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};