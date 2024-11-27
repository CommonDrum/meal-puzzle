// islands/PreferencesIsland.tsx
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { PreferenceSection } from "../components/preferences/PreferenceSection.tsx";
import { ErrorAlert } from "../components/ui/ErrorAlert.tsx";

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

export default function PreferencesIsland() {
  const isLoading = useSignal(false);
  const error = useSignal("");
  const success = useSignal(false);
  const preferences = useSignal<UserPreferences>(defaultPreferences);

  useEffect(() => {
    loadPreferences();
  }, []);

  async function loadPreferences() {
    try {
      const response = await fetch('/api/preferences');
      console.log('Load preferences response:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Load preferences error:', errorData);
        throw new Error(errorData.error || 'Failed to load preferences');
      }
      
      const data = await response.json();
      console.log('Loaded preferences:', data);
      
      if (data) {
        // Use spread with defaultPreferences to ensure all fields exist
        preferences.value = {
          ...defaultPreferences,
          ...data
        };
      }
    } catch (err) {
      console.error('Load preferences error:', err);
      error.value = err instanceof Error ? err.message : "Failed to load preferences";
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading.value = true;
    error.value = "";
    success.value = false;

    try {
      console.log('Sending preferences:', preferences.value);
      
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences.value),
      });

      console.log('Save response status:', response.status);
      const data = await response.json();
      console.log('Save response data:', data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to save preferences");
      }

      success.value = true;
    } catch (err) {
      console.error('Save preferences error:', err);
      error.value = err instanceof Error ? err.message : "Failed to save preferences";
    } finally {
      isLoading.value = false;
    }
  };
  return (
    <form onSubmit={handleSubmit} class="space-y-8">
      {error.value && <ErrorAlert message={error.value} />}
      
      {success.value && (
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                Preferences saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <PreferenceSection 
        title="Dietary Restrictions" 
        description="Select any dietary restrictions that apply to you."
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Vegetarian",
            "Vegan",
            "Pescatarian",
            "Gluten-Free",
            "Dairy-Free",
            "Keto",
            "Paleo"
          ].map((option) => (
            <label key={option} class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={preferences.value.dietary_restrictions.includes(option)}
                onChange={(e) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  preferences.value = {
                    ...preferences.value,
                    dietary_restrictions: checked
                      ? [...preferences.value.dietary_restrictions, option]
                      : preferences.value.dietary_restrictions.filter(item => item !== option)
                  };
                }}
              />
              <span class="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </PreferenceSection>

      <PreferenceSection
        title="Cooking Experience"
        description="Select your cooking skill level."
      >
        <div class="space-y-4">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <label key={level} class="flex items-center">
              <input
                type="radio"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                name="cooking_skill"
                value={level}
                checked={preferences.value.cooking_skill === level}
                onChange={(e) => {
                  preferences.value = {
                    ...preferences.value,
                    cooking_skill: (e.target as HTMLInputElement).value as 'beginner' | 'intermediate' | 'advanced'
                  };
                }}
              />
              <span class="ml-2 text-gray-700 capitalize">{level}</span>
            </label>
          ))}
        </div>
      </PreferenceSection>

      <PreferenceSection
        title="Preferred Cuisines"
        description="Select the types of cuisine you enjoy cooking."
      >
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            "Italian",
            "Mexican",
            "Chinese",
            "Japanese",
            "Indian",
            "Thai",
            "Mediterranean",
            "American",
            "French"
          ].map((cuisine) => (
            <label key={cuisine} class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={preferences.value.preferred_cuisines.includes(cuisine)}
                onChange={(e) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  preferences.value = {
                    ...preferences.value,
                    preferred_cuisines: checked
                      ? [...preferences.value.preferred_cuisines, cuisine]
                      : preferences.value.preferred_cuisines.filter(item => item !== cuisine)
                  };
                }}
              />
              <span class="ml-2 text-gray-700">{cuisine}</span>
            </label>
          ))}
        </div>
      </PreferenceSection>

      <PreferenceSection
        title="Cooking Details"
        description="Set your default cooking preferences."
      >
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Default Number of Servings
            </label>
            <input
              type="number"
              min="1"
              max="12"
              class="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={preferences.value.default_servings}
              onChange={(e) => {
                preferences.value = {
                  ...preferences.value,
                  default_servings: parseInt((e.target as HTMLInputElement).value)
                };
              }}
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Maximum Cooking Time (minutes)
            </label>
            <input
              type="number"
              min="15"
              max="240"
              step="15"
              class="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={preferences.value.max_cooking_time}
              onChange={(e) => {
                preferences.value = {
                  ...preferences.value,
                  max_cooking_time: parseInt((e.target as HTMLInputElement).value)
                };
              }}
            />
          </div>

          <div>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={preferences.value.metric_units}
                onChange={(e) => {
                  preferences.value = {
                    ...preferences.value,
                    metric_units: (e.target as HTMLInputElement).checked
                  };
                }}
              />
              <span class="ml-2 text-gray-700">Use Metric Units</span>
            </label>
          </div>
        </div>
      </PreferenceSection>

      <div class="pt-6 border-t border-gray-200">
        <div class="flex justify-end">
          <button
            type="submit"
            disabled={isLoading.value}
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading.value ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </div>
    </form>
  );
}