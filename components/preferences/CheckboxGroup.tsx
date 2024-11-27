// components/preferences/CheckboxGroup.tsx
interface CheckboxGroupProps {
  options: { label: string; value: string; }[];
  values: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const CheckboxGroup = ({
  options,
  values,
  onChange,
  columns = 1,
  className = ""
}: CheckboxGroupProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          checked={values.includes(option.value)}
          onChange={(checked) => {
            onChange(
              checked
                ? [...values, option.value]
                : values.filter((v) => v !== option.value)
            );
          }}
        />
      ))}
    </div>
  );
};