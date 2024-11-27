// components/preferences/NumberInput.tsx
interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const NumberInput = ({
  value,
  onChange,
  min,
  max,
  step,
  disabled = false,
  className = ""
}: NumberInputProps) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
    min={min}
    max={max}
    step={step}
    disabled={disabled}
    className={`mt-1 block w-24 rounded-md border-gray-300 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:border-gray-400 transition-colors duration-200 ${className}`}
  />
);