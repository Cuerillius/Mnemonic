import { FlashcardArray } from "react-quizlet-flashcard";
import Upload, { type Flashcard } from "./Upload";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px", // Optional: adds some space between the upload and flashcards
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
