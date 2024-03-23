import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardWord from "../chapterPage/CardWord";

const SectionWordsRandom = () => {
  const { wordsRandom, handleWordGetRandom } = useContext(GlobalContext);

  const handleLoad = () => {
    handleWordGetRandom();
  };

  useEffect(() => {
    handleWordGetRandom();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="bg-red-500 rounded-lg px-4 py-2 font-semibold text-slate-50">
        Random Words
      </h2>
      <button onClick={handleLoad} className="btn btn-blue">
        Load
      </button>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {Array.isArray(wordsRandom) &&
          wordsRandom.map((word, index) => {
            return <CardWord word={word} key={index} />;
          })}
      </div>
    </div>
  );
};

export default SectionWordsRandom;
