// components/preferences/RadioGroup.tsx
interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
}

export const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  className = ""
}: RadioGroupProps) => (
  <div className={`space-y-3 ${className}`}>
    {options.map((option) => (
      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300
                   hover:border-indigo-400 transition-colors duration-200"
        />
        <span className="text-sm text-gray-700">{option.label}</span>
      </label>
    ))}
  </div>
);