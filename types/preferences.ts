// types/preferences.ts

// Using Deno-style exports
export const PreferenceOptions = {
    spiceTolerance: ['Low', 'Medium', 'High'] as const,
    cookingSkill: ['Beginner', 'Intermediate', 'Advanced'] as const,
    dietType: ['None', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo'] as const,
  } as const;
  
  // Fresh/Deno style type exports
  export type SpiceTolerance = typeof PreferenceOptions.spiceTolerance[number];
  export type CookingSkill = typeof PreferenceOptions.cookingSkill[number];
  export type DietType = typeof PreferenceOptions.dietType[number];
  
  export interface ReferenceItem {
    id: string;
    name: string;
    display_name: string;
    standardized_name: string;
  }
  
  export interface UserPreferences {
    spice_tolerance: SpiceTolerance | null;
    cooking_skill: CookingSkill | null;
    max_cooking_time: number | null;
    diet_type: DietType | null;
  }