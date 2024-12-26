import { useEffect, useState } from "react";
import Filter from "../../features/exercises/Filter";
import MatchWordsScore from "../../features/exercises/MatchWordsScore";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { useLazyGetExerciseWordsQuery } from "@/features/globals/globalsApiSlice";

// helper function to shuffle words
function shuffle(array: any[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

type ExerciseWord = {
  word: string;
  key: number;
  selected: boolean;
};

export default function MatchWordsPage() {
  const [getExerciseWords, { data: words, isSuccess }] =
    useLazyGetExerciseWordsQuery();

  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  const [value, setValue] = useLocalStorage("highscore", 0);

  const [highestScore, setHighestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);

  // Array of word and translation
  const [firstWord, setFirstWord] = useState<ExerciseWord[]>([]);
  const [secondWord, setSecondWord] = useState<ExerciseWord[]>([]);

  // Boolean for all words completed
  const [allWordsCompleted, setAllWordsCompleted] = useState(false);

  // Index of selected words
  const [firstWordIndex, setFirstWordIndex] = useState<number | null>(null);
  const [secondWordIndex, setSecondWordIndex] = useState<number | null>(null);

  // Load Words on first render
  useEffect(() => {
    getExerciseWords(selectedLessons);
  }, [selectedLessons]);

  useEffect(() => {
    if (!isNaN(value)) {
      setHighestScore(value);
    }
  }, []);

  useEffect(() => {
    setValue(highestScore);
  }, [highestScore]);

  // set first and second words
  useEffect(() => {
    if (words) {
      setFirstWord(
        words.map((word, index) => ({
          word: word?.first,
          key: index,
          selected: false,
        }))
      );
      setSecondWord(
        shuffle(
          words.map((word, index) => ({
            word: word?.second,
            key: index,
            selected: false,
          }))
        )
      );
    }
  }, [words]);

  const handleCheck = () => {
    if (
      firstWordIndex !== null &&
      secondWordIndex !== null &&
      firstWord[firstWordIndex]?.key === secondWord[secondWordIndex]?.key
    ) {
      setFirstWord((curr) => {
        const temp = [...curr];
        temp[firstWordIndex].selected = true;
        return temp;
      });
      setSecondWord((curr) => {
        const temp = [...curr];
        temp[secondWordIndex].selected = true;
        return temp;
      });
      setScore((curr) => curr + 1);
      toast.success("Correct!");
      setFirstWordIndex(null);
      setSecondWordIndex(null);
    } else {
      toast.error("Wrong!");
      setFirstWordIndex(null);
      setSecondWordIndex(null);
      setLives((curr) => curr - 1);
    }
  };

  useEffect(() => {
    if (lives === 0) {
      confirm(`Congrats, you completed ${score} words, reset lives?`);
      setScore(0);
      setLives(5);
    }
  }, [lives]);

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(score);
    }
  }, [score]);

  const handleSelect = (group: string, index: number) => {
    if (group === "first") {
      setFirstWordIndex(index);
    }
    if (group === "second") {
      setSecondWordIndex(index);
    }
  };

  // check for matched after select
  useEffect(() => {
    if (isSuccess && firstWordIndex !== null && secondWordIndex !== null) {
      handleCheck();
    }
  }, [firstWordIndex, secondWordIndex]);

  useEffect(() => {
    if (Array.isArray(firstWord) && firstWord.length !== 0) {
      setAllWordsCompleted(
        firstWord.map((word) => word.selected).every(Boolean)
      );
    }
  }, [firstWord]);

  // re-load words when completed
  useEffect(() => {
    if (allWordsCompleted && confirm("Success! Load new words?")) {
      getExerciseWords(selectedLessons);
    }
  }, [allWordsCompleted]);

  return (
    <main className="">
      <MatchWordsScore
        score={score}
        lives={lives}
        highestScore={highestScore}
        setShowFilter={setShowFilter}
      />
      <div className="w-fit mx-auto flex flex-1">
        <div className="flex gap-2">
          <div className="word_col">
            {firstWord.map((word, index) => {
              return (
                <button
                  disabled={word.selected}
                  onClick={() => handleSelect("first", index)}
                  key={index}
                  className={
                    (word.selected
                      ? "from-zinc-500 to-zinc-300"
                      : index === firstWordIndex
                      ? "from-lime-500 to-lime-400"
                      : "border-sky-700 from-sky-500 to-sky-400 cursor-pointer ") +
                    " word bg-gradient-to-br "
                  }
                >
                  {word.word}
                </button>
              );
            })}
          </div>
          <div className="word_col">
            {secondWord.map((word, index) => {
              return (
                <button
                  key={index}
                  disabled={word.selected}
                  onClick={() => handleSelect("second", index)}
                  className={
                    (word.selected
                      ? "from-zinc-500 to-zinc-400"
                      : index === secondWordIndex
                      ? "from-lime-500 to-lime-400"
                      : "border-sky-700 from-sky-500 to-sky-400 cursor-pointer ") +
                    " word bg-gradient-to-br "
                  }
                >
                  {word.word}
                </button>
              );
            })}
          </div>
        </div>
        {/* <p
        className={
          (result === "Success"
            ? " bg-lime-200 border-lime-400 "
            : result === "Failed"
            ? " bg-red-300 border-red-500 "
            : " translate-x-10 opacity-0 ") +
          " duration-200 fixed top-[200px] right-[100px] p-3 border-2 rounded-md"
        }
      >
        {result === "Success" ? "Success" : result === "Failed" ? "Wrong!" : ""}
      </p> */}
        {/* <div className="flex items-center justify-center">
        {!allWordsCompleted ? (
          <button className="btn btn-red mx-auto my-2" onClick={handleCheck}>
            Check
          </button>
        ) : (
          <button onClick={getRandomWords}>Reload</button>
        )}
      </div> */}
      </div>
      {showFilter && (
        <Filter
          selectedLessons={selectedLessons}
          setSelectedLessons={setSelectedLessons}
          setShowFilter={setShowFilter}
        />
      )}
    </main>
  );
}
