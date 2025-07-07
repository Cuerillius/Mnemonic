import type { JSX } from "react";
import { Flashcard } from "react-quizlet-flashcard";

type Card = {
  name: string;
  image: string;
};

export type Flashcard = {
  id: number;
  frontHTML: JSX.Element;
  backHTML: JSX.Element;
};

function Upload({
  setCards,
}: {
  setCards: React.Dispatch<React.SetStateAction<Array<Flashcard>>>;
}) {
  function uploadFiles(files: FileList | null) {
    if (!files) return;
    let cards: Array<Card> = [];
    try {
      for (const file of Array.from(files)) {
        let card: Card = {
          name: file.name,
          image: URL.createObjectURL(file),
        };
        cards.push(card);
      }
    } catch (error) {
      console.log(error);
    }
    convertToFlashcards(cards);
  }

  function convertToFlashcards(cards: Array<Card>) {
    const flashcards: Array<Flashcard> = [];
    try {
      for (const [index, card] of cards.entries()) {
        flashcards.push({
          id: index,
          frontHTML: (
            <img
              src={card.image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={card.name}
            />
          ),
          backHTML: (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {card.name}
            </div>
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setCards(flashcards);
  }
  return (
    <input
      type="file"
      name="filefield"
      accept=".jpg, .jpeg, .png"
      multiple
      onChange={(e) => uploadFiles(e.target.files)}
    ></input>
  );
}

export default Upload;
