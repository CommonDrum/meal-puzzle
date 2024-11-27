// components/Badge.tsx
export function Badge({ children, class: className = "" }: { children: preact.ComponentChildren; class?: string }) {
  return (
    <div class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </div>
  );
}
