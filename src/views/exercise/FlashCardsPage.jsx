import React, { useEffect, useState } from "react";
import { useLazyGetRandomWordsQuery } from "../../features/randomWords/randomWordsSlice";
import CardFlashCards from "../../features/exercises/CardFlashCards";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoArrowForward } from "react-icons/io5";

export default function FlashCardsPage() {
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [count, setCount] = useState(0);

  const [firstLang, setFirstLang] = useState(true);

  const options = Array.from(
    new Set(
      new Array(4).fill("").map(() => {
        return words[Math.floor(Math.random() * words.length)];
      })
    )
  );

  const handleNext = () => {
    if (count > 5) {
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

  const [
    getRandomWords,
    { data: wordsData, isLoading, isSuccess, isError, error },
  ] = useLazyGetRandomWordsQuery();

  // Load Words on first render
  useEffect(() => {
    setCompleted(false);
    setCount(0);
    setWordIndex(0);
    getRandomWords(selectedLessons);
  }, [selectedLessons, completed]);

  // de-normalize words
  useEffect(() => {
    if (isSuccess) {
      let { ids, entities } = wordsData;
      let temp = ids.map((id) => entities[id]);
      setWords(temp);
    }
  }, [wordsData]);

  const isFirst = wordIndex === 0;
  const isLast = wordIndex === words.length - 1;

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
      />
    );
  } else {
    content = null;
  }

  return (
    <main>
      {/* <header className=" from-zinc-200 to-white text-zinc-600 border-2 border-zinc-400">
        <h1 className="mx-auto font-bold text-2xl">Flash Cards</h1>
      </header> */}
      <div>
        <button
          className="mt-auto mb-4 mx-auto py-2 px-6 bg-red-600 text-white font-medium hover:bg-red-700 duration-200 w-fit flex items-center gap-2"
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
          <button
            title="Previous"
            onClick={handlePrev}
            disabled={isFirst}
            className="text-red-600 disabled:text-zinc-500"
          >
            <BiChevronLeft size={40} />
          </button>
          {content}
          <button
            title="Next"
            onClick={handleNext}
            className="text-red-600 disabled:text-zinc-500"
          >
            <BiChevronRight size={40} />
          </button>
        </div>
      </div>
    </main>
  );
}
