import React, { useEffect, useState } from "react";
import { useLazyGetRandomWordsQuery } from "../randomWords/randomWordsSlice";
import MatchWordsScore from "./MatchWordsScore";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import Filter from "./Filter";
import { CiFilter } from "react-icons/ci";

// helper function to shuffle words
function shuffle(array) {
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

export default function MatchWords() {
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [value, setValue] = useLocalStorage("highscore", 0);
  const [words, setWords] = useState([]);

  const [highestScore, setHighestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);

  // Array of word and translation
  const [firstWord, setFirstWord] = useState([]);
  const [secondWord, setSecondWord] = useState([]);

  // Boolean for all words completed
  const [allWordsCompleted, setAllWordsCompleted] = useState(false);

  // Index of selected words
  const [firstWordIndex, setFirstWordIndex] = useState(null);
  const [secondWordIndex, setSecondWordIndex] = useState(null);

  // Status & Result message
  const [result, setResult] = useState("");

  const [
    getRandomWords,
    { data: wordsData, isLoading, isSuccess, isError, error },
  ] = useLazyGetRandomWordsQuery();

  // Load Words on first render
  useEffect(() => {
    getRandomWords(selectedLessons);
  }, [selectedLessons]);

  useEffect(() => {
    if (!isNaN(value)) {
      setHighestScore(value);
    }
  }, []);

  useEffect(() => {
    setValue(highestScore);
  }, [highestScore]);

  // de-normalize words
  useEffect(() => {
    if (isSuccess) {
      let { ids, entities } = wordsData;
      let temp = ids.map((id) => entities[id]);
      setWords(temp);
    }
  }, [wordsData]);

  // set first and second words
  useEffect(() => {
    setFirstWord(() => {
      return words.map((word, index) => {
        return { word: word?.first, key: index, selected: false };
      });
    });
    setSecondWord(() => {
      return shuffle(
        words.map((word, index) => {
          return { word: word?.second, key: index, selected: false };
        })
      );
    });
  }, [words]);

  const handleCheck = () => {
    if (firstWord[firstWordIndex]?.key === secondWord[secondWordIndex]?.key) {
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
      // setResult("Success");
      setFirstWordIndex(null);
      setSecondWordIndex(null);
    } else {
      toast.error("Wrong!");
      // setResult("Failed");
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

  const handleSelect = (group, index) => {
    setResult("select");
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

  // handle success message
  // useEffect(() => {
  //   const timer = setTimeout(() => setResult("wait"), 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [result]);

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
      getRandomWords();
    }
  }, [allWordsCompleted]);

  return (
    <div className="w-fit mx-auto flex">
      {showFilter ? (
        <Filter
          selectedLessons={selectedLessons}
          setSelectedLessons={setSelectedLessons}
          setShowFilter={setShowFilter}
        />
      ) : null}
      <div>
        <div className="flex gap-2">
          <button onClick={() => setShowFilter(true)}>
            <CiFilter size={32} />
          </button>
          <MatchWordsScore
            score={score}
            lives={lives}
            highestScore={highestScore}
          />
        </div>
        {/* <h1>Match Words</h1> */}
        <div className="flex gap-1">
          <div className="word_col">
            {firstWord.map((word, index) => {
              return (
                <button
                  disabled={word.selected}
                  onClick={() => handleSelect("first", index)}
                  key={index}
                  className={
                    (word.selected
                      ? "border-zinc-500 bg-zinc-300"
                      : index === firstWordIndex
                      ? "border-lime-500 bg-lime-200"
                      : "border-sky-900 bg-sky-200 cursor-pointer ") + " word"
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
                      ? "border-zinc-500 bg-zinc-300"
                      : index === secondWordIndex
                      ? "border-lime-500 bg-lime-200"
                      : "border-sky-900 bg-sky-200 cursor-pointer ") + " word"
                  }
                >
                  {word.word}
                </button>
              );
            })}
          </div>
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
  );
}
