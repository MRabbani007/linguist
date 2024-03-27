import CardWord from "../words/CardWord";
import { useLazyGetRandomWordsQuery } from "../randomWords/randomWordsSlice";
import { useEffect } from "react";

const SectionWordsRandom = () => {
  const [
    getRandomWords,
    { data: wordsRandom, isLoading, isSuccess, isError, error },
  ] = useLazyGetRandomWordsQuery();

  const handleLoad = () => {
    getRandomWords();
  };

  useEffect(() => {
    getRandomWords();
  }, []);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    // destructure words from normalized object
    const { ids, entities } = wordsRandom;
    if (ids) {
      content = ids.map((id, index) => (
        <CardWord word={entities[id]} key={id} />
      ));
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="bg-red-500 rounded-lg px-4 py-2 font-semibold text-slate-50">
        Random Words
      </h2>
      <button onClick={handleLoad} className="btn btn-blue">
        Load
      </button>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {content}
      </div>
    </div>
  );
};

export default SectionWordsRandom;
