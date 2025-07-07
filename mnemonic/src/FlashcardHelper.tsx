import type { JSX } from "react";

export type CardProps = {
  name: string;
  image: string;
};

export type FlashcardProps = {
  id: number;
  frontHTML: JSX.Element;
  backHTML: JSX.Element;
};

export function convertToFlashcards(cards: Array<CardProps>) {
  const flashcards: Array<FlashcardProps> = [];
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
  return flashcards;
}
