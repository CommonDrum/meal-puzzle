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
  cards: CardData[];
}

export default function CardIsland() {
  // Initialize docks with their cards
  const docks = useSignal<DockData[]>([
    { id: "dock1", title: "Dock 1", cards: [] },
    { id: "dock2", title: "Dock 2", cards: [] },
    { id: "dock3", title: "Dock 3", cards: [] },
    { 
      id: "dock4", 
      title: "Dock 4", 
      cards: [
        { id: "card1", text: "Card 1", backgroundUrl: "/logo.svg" },
        { id: "card2", text: "Card 2", backgroundUrl: "/logo.svg" },
        { id: "card3", text: "Card 3", backgroundUrl: "/logo.svg" },
        { id: "card4", text: "Card 4", backgroundUrl: "/logo.svg" },
        { id: "card5", text: "Card 5", backgroundUrl: "/logo.svg" },
      ]
    },
  ]);

  const draggedCardId = useSignal<string | null>(null);

  const handleDragStart = (_: DragEvent, cardId: string) => {
    draggedCardId.value = cardId;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent, targetDockId: string) => {
    e.preventDefault();
    
    if (!draggedCardId.value) return;

    // Find source dock and card
    const sourceDock = docks.value.find(dock => 
      dock.cards.some(card => card.id === draggedCardId.value)
    );
    
    if (!sourceDock) return;

    // Find the card to move
    const cardToMove = sourceDock.cards.find(card => card.id === draggedCardId.value);
    if (!cardToMove) return;

    // Create new docks array with the card moved
    docks.value = docks.value.map(dock => {
      if (dock.id === sourceDock.id) {
        return {
          ...dock,
          cards: dock.cards.filter(card => card.id !== draggedCardId.value)
        };
      }
      if (dock.id === targetDockId) {
        return {
          ...dock,
          cards: [...dock.cards, cardToMove]
        };
      }
      return dock;
    });

    draggedCardId.value = null;
  };

  if (!IS_BROWSER) {
    return <div>Loading...</div>;
  }

  return (
    <div class="p-8">
      <h2 class="text-2xl font-bold mb-8">Card Island</h2>
      <div class="grid grid-cols-2 gap-8">
        {docks.value.map((dock) => (
          <Dock 
            key={dock.id}
            id={dock.id}
            title={dock.title}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
  );
}