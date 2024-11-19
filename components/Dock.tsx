// components/Dock.tsx
import { ComponentChildren } from "preact";

export interface DockProps {
  id: string;
  children?: ComponentChildren;
  title: string;
  capacity: number;
  onDragOver: (e: DragEvent) => void;
  onDragEnter: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent, dockId: string) => void;
  isDraggedOver?: boolean;
}

export function Dock({ 
  id, 
  children, 
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop, 
  isDraggedOver 
}: DockProps) {
  const childArray = children ? (Array.isArray(children) ? children : [children]) : [];
  
  // Calculate scale based on number of cards
  const calculateScale = (totalCards: number) => {
    if (totalCards <= 1) return 1;
    // Allow more space for images while maintaining dock boundaries
    const maxWidth = 800; // Typical dock width
    const cardWidth = 128; // Base card width
    const desiredGap = 16; // Minimum gap between cards
    const totalDesiredWidth = (cardWidth * totalCards) + (desiredGap * (totalCards - 1));
    const scale = Math.min(1, maxWidth / totalDesiredWidth);
    return Math.max(0.4, scale); // Don't go smaller than 40%
  };

  const scale = calculateScale(childArray.length);

  return (
    <div 
      class={`min-h-[16rem] relative overflow-hidden ${isDraggedOver ? 'bg-blue-50/10' : ''}`}
      data-dock-id={id}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, id)}
    >
      {!childArray.length && (
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 64 64" 
            fill="none" 
            class="text-gray-200/30"
          >
            {/* Simple puzzle piece icon */}
            <path 
              d="M32 2 
                 C32 2 40 2 40 10 
                 C40 18 48 18 48 10
                 L62 10
                 L62 24
                 C54 24 54 32 62 32
                 C54 32 54 40 62 40
                 L62 54
                 L48 54
                 C48 46 40 46 40 54
                 C40 62 32 62 32 62
                 C32 62 24 62 24 54
                 C24 46 16 46 16 54
                 L2 54
                 L2 40
                 C10 40 10 32 2 32
                 C10 32 10 24 2 24
                 L2 10
                 L16 10
                 C16 18 24 18 24 10
                 C24 2 32 2 32 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      <div 
        class="h-full flex justify-center items-center transition-all duration-300 ease-in-out"
        style={{ gap: '16px' }}
      >
        {childArray.map((child, index) => (
          <div 
            key={index} 
            class="transition-all duration-300 ease-in-out origin-center"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}