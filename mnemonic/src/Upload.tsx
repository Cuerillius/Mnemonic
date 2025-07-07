import {
  convertToFlashcards,
  type CardProps,
  type FlashcardProps,
} from "./FlashcardHelper";

function Upload({
  setCards,
}: {
  setCards: React.Dispatch<React.SetStateAction<Array<FlashcardProps>>>;
}) {
  function uploadFiles(files: FileList | null) {
    if (!files) return;
    let cards: Array<CardProps> = [];
    try {
      for (const file of Array.from(files)) {
        let card: CardProps = {
          name: file.name,
          image: URL.createObjectURL(file),
        };
        cards.push(card);
      }
    } catch (error) {
      console.log(error);
    }
    setCards(convertToFlashcards(cards));
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
