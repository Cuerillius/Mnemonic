import { allCards } from "../cards/index";
import { convertToFlashcards, type FlashcardProps } from "./FlashcardHelper";
function loadLocal(): FlashcardProps[] {
  return convertToFlashcards(allCards);
}

export default loadLocal;
