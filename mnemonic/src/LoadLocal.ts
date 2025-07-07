import { allCards } from "../cards/index";
import { convertToFlashcards, type FlashcardProps } from "./FlashcardHelper";
function loadLocal(
  setCards: React.Dispatch<React.SetStateAction<Array<FlashcardProps>>>
): void {
  setCards(convertToFlashcards(allCards));
}

export default loadLocal;
