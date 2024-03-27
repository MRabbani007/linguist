import { useState } from "react";
import { useAddWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";

const CardWordAdd = ({ colSpan }) => {
  const displayBlock = useSelector(selectDisplayBlock);

  const [addWord, { isLoading }] = useAddWordMutation();

  const [viewAddWord, setViewAddWord] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [fourthInput, setFourthInput] = useState("");

  const canSave = !isLoading; //[firstInput, secondInput, thirdInput, fourthInput].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let word = {
          id: crypto.randomUUID(),
          chpaterID: displayBlock.chapterID,
          blockID: displayBlock.id,
          first: firstInput,
          second: secondInput,
          third: thirdInput,
          fourth: fourthInput,
        };
        const res = await addWord(word).unwrap();
      } catch (err) {
        console.error("Failed to add the word", err);
      }
    }
  };

  const handleReset = () => {
    setViewAddWord(!viewAddWord);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 my-2">
      <div className="flex flex-1 justify-center">
        <button onClick={handleReset} className="btn btn-red">
          Add Word
        </button>
      </div>
      {viewAddWord ? (
        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className="flex gap-2">
            <div className="field">
              <label htmlFor="firstLanguage" className="field__label">
                {displayBlock?.firstLang || "First Language"}
              </label>
              <input
                type="text"
                name="firstLanguage"
                className="field__input"
                placeholder={displayBlock?.firstLang || "First Language"}
                value={firstInput}
                onChange={(e) => {
                  setFirstInput(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label htmlFor="secondLanguage" className="field__label">
                {displayBlock?.secondLang || "Second Language"}
              </label>
              <input
                type="text"
                name="secondLanguage"
                placeholder={displayBlock?.secondLang || "Second Language"}
                className="field__input"
                value={secondInput}
                onChange={(e) => {
                  setSecondInput(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {colSpan > 4 ? (
              <div className="field">
                <label htmlFor="thirdLanguage" className="field__label">
                  {displayBlock?.thirdLang || "Third Language"}
                </label>
                <input
                  type="text"
                  name="thirdLanguage"
                  placeholder={displayBlock?.thirdLang || "Third Language"}
                  className="field__input"
                  value={thirdInput}
                  onChange={(e) => {
                    setThirdInput(e.target.value);
                  }}
                />
              </div>
            ) : null}
            {colSpan > 5 ? (
              <div className="field">
                <label htmlFor="fourthLanguage" className="field__label">
                  {displayBlock?.fourthLang || "Fourth Language"}
                </label>
                <input
                  type="text"
                  name="fourthLanguage"
                  placeholder={displayBlock?.fourthLang || "Fourth Language"}
                  className="field__input"
                  value={fourthInput}
                  onChange={(e) => {
                    setFourthInput(e.target.value);
                  }}
                />
              </div>
            ) : null}
          </div>
          <p>{statusMessage}</p>
          <button type="submit" className="btn btn-red">
            Add
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default CardWordAdd;
