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

export function shuffleFlashcards(flashcards: FlashcardProps[]) {
  let currentIndex = flashcards.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [flashcards[currentIndex], flashcards[randomIndex]] = [
      flashcards[randomIndex],
      flashcards[currentIndex],
    ];
  }
  return flashcards;
}

export function convertToFlashcards(cards: Array<CardProps>) {
  const flashcards: Array<FlashcardProps> = [];
  try {
    for (const [index, card] of cards.entries()) {
      let name = card.name
        .replace(/\.(jpg|jpeg|png|svg)$/i, "")
        .replace(/[-_.]/g, " ");

      flashcards.push({
        id: index,
        frontHTML: (
          <img
            src={card.image}
            className="h-full w-full rounded-xl object-cover"
            alt={name}
          />
        ),
        backHTML: (
          <div className="relative flex h-full items-center justify-center rounded-xl bg-orange-500 text-2xl">
            <div className="relative">{name}</div>
          </div>
        ),
      });
    }
  } catch (error) {
    console.log(error);
  }
  return flashcards;
}
