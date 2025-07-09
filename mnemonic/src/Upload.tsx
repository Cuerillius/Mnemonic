import {
  convertToFlashcards,
  shuffleFlashcards,
  type CardProps,
  type FlashcardProps,
} from "./FlashcardHelper";

function Upload({
  setCards,
  resetCardPosition,
}: {
  setCards: React.Dispatch<React.SetStateAction<Array<FlashcardProps>>>;
  resetCardPosition: () => void;
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
    resetCardPosition();
  }
  return (
    <div className="p-[3px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(18,100%,50%)] to-[hsl(12,56%,54%)] rounded-lg" />
      <div className="px-8 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
        <label className="text-white cursor-pointer" htmlFor="file-upload">
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
      </div>
    </div>
  );
}

export default Upload;
