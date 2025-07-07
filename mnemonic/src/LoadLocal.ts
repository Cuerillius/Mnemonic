import {
  convertToFlashcards,
  type CardProps,
  type FlashcardProps,
} from "./FlashcardHelper";

const imageModules = import.meta.glob("/public/cards/**/*.{png,jpg,jpeg,svg}");

async function loadLocal(
  setCards: React.Dispatch<React.SetStateAction<Array<FlashcardProps>>>
): Promise<void> {
  const cards = await loadFiles();
  setCards(convertToFlashcards(cards));
}

async function loadFiles(): Promise<Array<CardProps>> {
  const cards: Array<CardProps> = [];
  for (const path in imageModules) {
    const url = path;
    const name = path.split("/").pop() ?? path;
    const card: CardProps = {
      name: name,
      image: url,
    };
    cards.push(card);
  }
  return cards;
}

export default loadLocal;
