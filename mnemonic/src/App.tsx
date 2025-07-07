import { FlashcardArray } from "react-quizlet-flashcard";
import Upload from "./Upload";
import { useEffect, useState } from "react";
import loadLocal from "./LoadLocal";
import type { FlashcardProps } from "./FlashcardHelper";

function App() {
  const [cards, setCards] = useState<FlashcardProps[]>([]);

  useEffect(() => {
    loadLocal(setCards);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Upload setCards={setCards} />
      {cards.length > 0 && (
        <div className="text-white">
          <FlashcardArray cards={cards} />
        </div>
      )}
    </div>
  );
}

export default App;
