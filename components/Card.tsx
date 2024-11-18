// components/Card.tsx
export interface CardProps {
  id: string;
  backgroundUrl: string;
  text: string;
  onDragStart: (e: DragEvent, cardId: string) => void;
}

export function Card({ id, backgroundUrl, text, onDragStart }: CardProps) {
  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(e, id);
  };

  return (
    <div
      class="relative w-32 h-48 rounded-xl shadow-lg cursor-move 
        transform transition-all duration-200 ease-out
        hover:scale-105 hover:shadow-2xl hover:z-10
        active:scale-95 active:shadow-md
        group"
      draggable="true"
      data-card-id={id}
      onDragStart={handleDragStart}
    >
      <img 
        src={backgroundUrl || "/placeholder.png"} 
        alt="card background"
        class="absolute w-full h-full object-cover rounded-xl 
          group-hover:brightness-110 transition-all duration-200"
      />
      <div class="absolute inset-0 rounded-xl bg-gradient-to-b 
        from-transparent via-black/20 to-black/60">
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <p class="text-white text-center font-medium text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
}