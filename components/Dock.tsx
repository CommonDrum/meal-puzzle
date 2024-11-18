// components/Dock.tsx
import { ComponentChildren } from "preact";

export interface DockProps {
  id: string;
  children?: ComponentChildren;
  title: string;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, dockId: string) => void;
}

export function Dock({ id, children, title, onDragOver, onDrop }: DockProps) {
  return (
    <div 
      class="p-4 rounded-lg border-2 border-gray-200 min-h-[16rem]"
      data-dock-id={id}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, id)}
    >
      <h3 class="text-lg font-semibold mb-4">{title}</h3>
      <div class="flex flex-wrap gap-4">
        {children}
      </div>
    </div>
  );
}