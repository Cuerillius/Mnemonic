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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Upload setCards={setCards} />
      {cards.length > 0 && (
        <div>
          <FlashcardArray cards={cards} />
        </div>
      )}
    </div>
  );
}

export default App;
