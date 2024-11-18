// islands/CardIsland.tsx
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Card } from "../components/Card.tsx";
import { Dock } from "../components/Dock.tsx";
import { useSignal } from "@preact/signals";

interface CardData {
  id: string;
  text: string;
  backgroundUrl: string;
}

interface DockData {
  id: string;
  title: string;
  capacity: number;
  cards: CardData[];
}

export default function CardIsland() {
  const docks = useSignal<DockData[]>([
    { id: "dock1", title: "Dock 1", capacity: 1, cards: [] },
    { id: "dock2", title: "Dock 2", capacity: 2, cards: [] },
    { id: "dock3", title: "Dock 3", capacity: 3, cards: [] },
    { 
      id: "dock4", 
      title: "Dock 4", 
      capacity: 5,
      cards: [
        { id: "card1", text: "Card 1", backgroundUrl: "/placeholder.png" },
        { id: "card2", text: "Card 2", backgroundUrl: "/placeholder.png" },
        { id: "card3", text: "Card 3", backgroundUrl: "/placeholder.png" },
        { id: "card4", text: "Card 4", backgroundUrl: "/placeholder.png" },
        { id: "card5", text: "Card 5", backgroundUrl: "/placeholder.png" },
      ]
    },
  ]);

  const draggedCardId = useSignal<string | null>(null);
  const draggedOverDockId = useSignal<string | null>(null);

  const handleDragStart = (_: DragEvent, cardId: string) => {
    draggedCardId.value = cardId;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    const dockId = (e.currentTarget as HTMLElement).dataset.dockId;
    if (dockId) {
      draggedOverDockId.value = dockId;
    }
  };

  const handleDragEnd = () => {
    draggedCardId.value = null;
    draggedOverDockId.value = null;
  };

  const moveCard = (cardId: string, fromDockId: string, toDockId: string): boolean => {
    const fromDock = docks.value.find(d => d.id === fromDockId);
    const toDock = docks.value.find(d => d.id === toDockId);
    
    if (!fromDock || !toDock) return false;
    if (toDock.cards.length >= toDock.capacity) return false;
    
    const cardToMove = fromDock.cards.find(c => c.id === cardId);
    if (!cardToMove) return false;

    docks.value = docks.value.map(dock => {
      if (dock.id === fromDockId) {
        return {
          ...dock,
          cards: dock.cards.filter(c => c.id !== cardId)
        };
      }
      if (dock.id === toDockId) {
        return {
          ...dock,
          cards: [...dock.cards, cardToMove]
        };
      }
      return dock;
    });

    return true;
  };

  const handleDrop = (e: DragEvent, targetDockId: string) => {
    e.preventDefault();
    
    if (!draggedCardId.value) return;

    // Find the source dock
    const sourceDock = docks.value.find(dock => 
      dock.cards.some(card => card.id === draggedCardId.value)
    );
    
    if (!sourceDock) return;

    // Try to move the card
    moveCard(draggedCardId.value, sourceDock.id, targetDockId);
    
    // Reset drag state
    draggedCardId.value = null;
    draggedOverDockId.value = null;
  };

  // Global handlers
  if (IS_BROWSER) {
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      draggedCardId.value = null;
      draggedOverDockId.value = null;
    });
  }

  if (!IS_BROWSER) {
    return <div>Loading...</div>;
  }

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-12 text-gray-800 text-center
          tracking-tight">Card Island</h2>
        <div class="grid grid-cols-2 gap-8">
          {docks.value.map((dock) => (
            <Dock 
              key={dock.id}
              id={dock.id}
              title={dock.title}
              capacity={dock.capacity}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDraggedOver={draggedOverDockId.value === dock.id}
            >
              {dock.cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  text={card.text}
                  backgroundUrl={card.backgroundUrl}
                  onDragStart={handleDragStart}
                />
              ))}
            </Dock>
          ))}
        </div>
      </div>
    </div>
  );
}