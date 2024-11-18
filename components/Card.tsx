// components/Card.tsx
export interface CardProps {
    id: string;
    backgroundUrl: string;
    text: string;
    onDragStart: (e: DragEvent, cardId: string) => void;
  }
  
  export function Card({ id, backgroundUrl, text, onDragStart }: CardProps) {
    return (
      <div
        class="relative w-32 h-48 rounded-lg shadow-lg cursor-move hover:shadow-xl transition-shadow"
        draggable="true"
        data-card-id={id}
        onDragStart={(e) => onDragStart(e, id)}
      >
        <img 
          src={backgroundUrl || "/placeholder.png"} 
          alt="card background"
          class="absolute w-full h-full object-cover rounded-lg"
        />
        <div class="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center p-4">
          <p class="text-white text-center font-medium">{text}</p>
        </div>
      </div>
    );
  }