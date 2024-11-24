// components/signup/FormHeader.tsx
interface FormHeaderProps {
  caption: string;
  subCaption: string;
  linkText: string;
  linkHref: string;
}

export function FormHeader({ caption, subCaption, linkText, linkHref }: FormHeaderProps) {
  return (
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900">{caption}</h2>
      <p class="mt-2 text-sm text-gray-600">
        {subCaption}{" "}
        <a href={linkHref} class="font-medium text-gray-900 hover:text-gray-700">
          {linkText}
        </a>
      </p>
    </div>
  );
}
