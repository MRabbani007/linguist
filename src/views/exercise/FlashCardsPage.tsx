import { useEffect, useState } from "react";
import CardFlashCards from "../../features/exercises/CardFlashCards";
import { IoArrowForward } from "react-icons/io5";
import { TbCardsFilled } from "react-icons/tb";
import { useLazyGetExerciseWordsQuery } from "@/features/globals/globalsApiSlice";

export default function FlashCardsPage() {
  const [getExerciseWords, { data: words, isLoading, isSuccess, isError }] =
    useLazyGetExerciseWordsQuery();

  const [selectedLessons, setSelectedLessons] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [count, setCount] = useState(0);

  const [firstLang, setFirstLang] = useState(true);

  const options = words
    ? Array.from(
        new Set(
          new Array(4).fill("").map(() => {
            return words[Math.floor(Math.random() * words.length)];
          })
        )
      )
    : [];

  const handleNext = () => {
    if (!words) return;

    if (count > 3) {
      setCompleted(true);
    } else if (wordIndex < words.length - 1) {
      setWordIndex((curr) => curr + 1);
      setCount((curr) => curr + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (wordIndex > 0) {
      setWordIndex((curr) => curr - 1);
      setCount((curr) => curr - 1);
    } else {
    }
  };

  // Load Words on first render
  useEffect(() => {
    setCompleted(false);
    setCount(0);
    setWordIndex(0);
    getExerciseWords(selectedLessons);
  }, [selectedLessons, completed]);

  const isFirst = wordIndex === 0;
  const isLast = words ? wordIndex === words.length - 1 : true;

  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isError) {
    content = <p>Error Loading Words</p>;
  } else if (isSuccess) {
    content = (
      <CardFlashCards
        word={words[wordIndex]}
        firstLang={firstLang}
        options={options}
        handlePrev={handlePrev}
        handleNext={handleNext}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  } else {
    content = null;
  }

  return (
    <main>
      <header className="flex items-center justify-center gap-4 bg-destructive text-accent p-4">
        <TbCardsFilled size={30} />
        <h1 className="font-bold text-xl">Flash Cards</h1>
      </header>
      <div>
        <button
          className="mt-auto mb-4 mx-auto py-2 px-6 bg-accent text-accent_foreground font-medium duration-200 w-fit flex items-center gap-2"
          onClick={() => setFirstLang((curr) => !curr)}
        >
          {firstLang ? (
            <>
              <span>English</span>
              <IoArrowForward size={26} />
              <span>Russian</span>
            </>
          ) : (
            <>
              <span>Russian</span>
              <IoArrowForward size={26} />
              <span>Engish</span>
            </>
          )}
        </button>
        <div className="flex items-center justify-center w-fit mx-auto">
          {content}
        </div>
      </div>
    </main>
  );
}
