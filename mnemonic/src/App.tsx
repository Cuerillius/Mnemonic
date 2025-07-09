import { FlashcardArray } from "react-quizlet-flashcard";
import Upload from "./Upload";
import { useEffect, useRef, useState } from "react";
import loadLocal from "./LoadLocal";
import { shuffleFlashcards, type FlashcardProps } from "./FlashcardHelper";
import { useKeyboardShortcut } from "./KeyboardHandler";
import { CircleChevronLeft } from "./assets/CircleChevronLeft";
import { CircleChevronRight } from "./assets/CircleChevronRight";
import { CircleQuestionMark } from "./assets/CircleQuestionMark";

type FlashcardControls = {
  nextCard: () => void;
  prevCard: () => void;
  resetArray: () => void;
};

function App() {
  const [cards, setCards] = useState<FlashcardProps[]>([]);

  // see: https://github.com/ABSanthosh/react-quizlet-flashcard?tab=readme-ov-file#cards-with-custom-controlsusing-forwardref-prop
  // @ts-ignore
  const controlRef = useRef<FlashcardControls>({});
  // @ts-ignore
  const currentCardFlipRef = useRef<() => void>();
  const [currentCard, setCurrentCard] = useState(1);

  useKeyboardShortcut({
    key: "ArrowRight",
    onKeyPressed: () => controlRef.current?.nextCard(),
  });
  useKeyboardShortcut({
    key: "ArrowLeft",
    onKeyPressed: () => controlRef.current?.prevCard(),
  });
  useKeyboardShortcut({
    key: " ",
    onKeyPressed: () => currentCardFlipRef.current?.(),
  });
  useKeyboardShortcut({
    key: "s",
    onKeyPressed: () => resetCards(),
  });

  function resetCards() {
    setCards((prevCards) => shuffleFlashcards([...prevCards]));
    controlRef.current?.resetArray();
    setCurrentCard(1);
  }

  useEffect(() => {
    setCards(loadLocal());
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-black bg-[radial-gradient(at_90%_93%,hsla(12,56%,54%,0.3)_0px,transparent_50%),radial-gradient(at_0%_0%,hsla(18,100%,50%,0.5)_0px,transparent_50%)]">
      <div className="flex items-center justify-start p-4 gap-4">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          className="w-12 h-12"
        />
        <h1 className="text-3xl  font-bold">mnemonic</h1>
      </div>

      <div className="flex flex-col justify-center items-center h-screen gap-5">
        <div className="absolute top-5 right-5 flex items-center gap-4">
          <Upload setCards={setCards} resetCardPosition={resetCards} />
          <div className="relative group">
            <CircleQuestionMark className="w-8 h-8 fill-current text-[hsl(18,100%,50%)] cursor-pointer" />
            <div className="absolute hidden group-hover:flex flex-col gap-2 right-0 mt-4 p-4 bg-black text-white rounded-lg shadow-xl w-max text-sm border border-[hsl(12,56%,34%)]">
              <p className="flex items-center gap-2">
                <kbd className="font-sans font-semibold py-1 px-2 bg-[hsl(12,56%,24%)] text-[hsl(12,56%,84%)] rounded-md border-b-2 border-[hsl(12,56%,34%)]">
                  Space
                </kbd>
                <span> Flip card</span>
              </p>
              <p className="flex items-center gap-2">
                <kbd className="font-sans font-semibold py-1 px-2 bg-[hsl(12,56%,24%)] text-[hsl(12,56%,84%)] rounded-md border-b-2 border-[hsl(12,56%,34%)]">
                  →
                </kbd>
                <span> Next card</span>
              </p>
              <p className="flex items-center gap-2">
                <kbd className="font-sans font-semibold py-1 px-2 bg-[hsl(12,56%,24%)] text-[hsl(12,56%,84%)] rounded-md border-b-2 border-[hsl(12,56%,34%)]">
                  ←
                </kbd>
                <span> Previous card</span>
              </p>
              <p className="flex items-center gap-2">
                <kbd className="font-sans font-semibold py-1 px-2 bg-[hsl(12,56%,24%)] text-[hsl(12,56%,84%)] rounded-md border-b-2 border-[hsl(12,56%,34%)]">
                  S
                </kbd>
                <span> Shuffle Cards</span>
              </p>
            </div>
          </div>
        </div>
        {cards.length > 0 && (
          <div
            className="text-white"
            onClick={() => currentCardFlipRef.current?.()}
          >
            <FlashcardArray
              cards={cards}
              controls={false}
              showCount={false}
              forwardRef={controlRef}
              currentCardFlipRef={currentCardFlipRef}
              onCardChange={(_, index) => {
                setCurrentCard(index);
              }}
            />
            <div className="flex items-center justify-center gap-4 mt-4 text-white">
              <CircleChevronLeft
                className="w-8 h-8 fill-current cursor-pointer"
                onClick={() => controlRef.current?.prevCard()}
              />
              <div className="text-lg font-semibold">
                {currentCard} / {cards.length}
              </div>
              <CircleChevronRight
                className="w-8 h-8 fill-current cursor-pointer"
                onClick={() => controlRef.current?.nextCard()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
