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
    <>
      <label className="text-white " htmlFor="file-upload">
        Upload Images
      </label>
      <input
        id="file-upload"
        type="file"
        name="filefield"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={(e) => uploadFiles(e.target.files)}
        className="hidden"
      />
    </>
  );
}

export default Upload;
