// components/Card.tsx
export function Card({ children, class: className = "" }: { children: preact.ComponentChildren; class?: string }) {
  return (
    <div class={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, class: className = "" }: { children: preact.ComponentChildren; class?: string }) {
  return <div class={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, class: className = "" }: { children: preact.ComponentChildren; class?: string }) {
  return <h3 class={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, class: className = "" }: { children: preact.ComponentChildren; class?: string }) {
  return <p class={`text-sm text-muted-foreground ${className}`}>{children}</p>;
}

export function CardContent({ children, class: className = "" }: { children: preact.ComponentChildren; class?: string }) {
  return <div class={`p-6 pt-0 ${className}`}>{children}</div>;
}