// components/signup/FormField.tsx
interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: Event) => void;
  placeholder?: string;
  hint?: string;
}

export function FormField({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  hint,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} class="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div class="mt-1 relative">
        <input
          id={id}
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg 
                 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 
                 focus:ring-gray-900 focus:border-gray-900"
          placeholder={placeholder}
        />
      </div>
      {hint && <p class="mt-2 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}