// components/Dock.tsx
import { ComponentChildren } from "preact";

export interface DockProps {
  id: string;
  children?: ComponentChildren;
  title: string;
  capacity: number;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, dockId: string) => void;
  isDraggedOver?: boolean;
}

export function Dock({ 
  id, 
  children, 
  title, 
  onDragOver, 
  onDrop, 
  isDraggedOver 
}: DockProps) {
  return (
    <div 
      class={`p-6 rounded-2xl border-2 min-h-[16rem]
        transform transition-all duration-200 ease-out
        ${isDraggedOver 
          ? 'border-blue-400 bg-blue-50/50 scale-[1.02] shadow-lg' 
          : 'border-gray-200/60 bg-white/80 hover:border-gray-300'}
        backdrop-blur-sm`}
      data-dock-id={id}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
    >
      <h3 class="text-lg font-semibold mb-6 text-gray-700 
        tracking-tight transition-colors duration-200">{title}</h3>
      <div class="flex flex-wrap gap-6">
        {children}
      </div>
    </div>
  );
}