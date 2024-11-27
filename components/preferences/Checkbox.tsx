// components/preferences/Checkbox.tsx
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  className = ""
}: CheckboxProps) => (
  <label className={`flex items-center space-x-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded 
                hover:border-indigo-400 transition-colors duration-200"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);