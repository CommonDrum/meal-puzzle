// components/StepList.tsx
import { useSignal } from "@preact/signals";
import { Check } from "lucide-react";

interface StepListProps {
  steps: string[];
}

export function StepList({ steps }: StepListProps) {
  const completedSteps = useSignal<Set<number>>(new Set());

  // Toggle step function with clearer comments
  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps.value);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    completedSteps.value = newCompleted; // Ensures state updates properly
  };

  // Check if a step is completed
  const isStepCompleted = (index: number) => completedSteps.value.has(index);

  return (
    <div class="space-y-6">
      {steps.map((step, index) => {
        const completed = isStepCompleted(index);
        return (
          <div
            key={index}
            class="flex gap-4 group cursor-pointer" // Add cursor pointer for better UX
            onClick={() => toggleStep(index)} // Step toggle handler
          >
            {/* Step Indicator */}
            <div class="relative">
              <div
                class={`w-8 h-8 rounded-full flex items-center justify-center font-medium
                transition-all duration-200 cursor-pointer
                ${completed
                  ? 'bg-emerald-100 text-emerald-600'  // Completed state
                  : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'}`  // Default state
                }
              >
                {completed ? <Check size={16} /> : index + 1}
              </div>

              {/* Vertical line for non-final steps */}
              {index < steps.length - 1 && (
                <div
                  class={`absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-12
                  transition-colors duration-200
                  ${completed ? 'bg-emerald-200' : 'bg-gray-200'}`}
                />
              )}
            </div>

            {/* Step Content */}
            <div
              class={`flex-1 bg-white rounded-xl p-4 shadow-sm border
                transition-all duration-200 cursor-pointer
                ${completed
                  ? 'border-emerald-100 bg-emerald-50'  // Completed step content
                  : 'border-gray-100 group-hover:border-indigo-100'}`}  // Default step content
            >
              <div class="flex items-center justify-between">
                <p
                  class={`leading-relaxed transition-colors duration-200
                    ${completed ? 'text-emerald-700' : 'text-gray-600'}`}
                >
                  {step}
                </p>
                {/* Check Icon when completed */}
                {completed && <Check size={16} class="text-emerald-500 ml-2" />}
              </div>
            </div>
          </div>
        );
      })}

      {/* Progress Summary */}
      <div class="mt-8 flex justify-between items-center px-4 py-3 bg-white rounded-lg border border-gray-100">
        <span class="text-gray-600">
          Progress: {completedSteps.value.size} of {steps.length} steps completed
        </span>
        <div class="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${(completedSteps.value.size / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
