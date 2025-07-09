import { FlashcardArray } from "react-quizlet-flashcard";
import Upload from "./Upload";
import { useEffect, useRef, useState } from "react";
import loadLocal from "./LoadLocal";
import type { FlashcardProps } from "./FlashcardHelper";
import { useKeyboardShortcut } from "./KeyboardHandler";
import { CircleChevronLeft } from "./assets/CircleChevronLeft";
import { CircleChevronRight } from "./assets/CircleChevronRight";

interface FlashcardControls {
  nextCard: () => void;
  prevCard: () => void;
  resetArray: () => void;
}

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

  useEffect(() => {
    loadLocal(setCards);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Upload setCards={setCards} />
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
  );
}

export default App;
