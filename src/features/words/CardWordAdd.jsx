import { useState } from "react";
import { useAddWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectLanguagesCount,
} from "../globals/globalsSlice";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";

const CardWordAdd = () => {
  const displayBlock = useSelector(selectDisplayBlock);
  const languagesCount = useSelector(selectLanguagesCount);

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
      <button onClick={handleReset} className="btn btn-red">
        Add Word
      </button>
      <form
        className={
          (viewAddWord ? "visible" : "invisible -translate-y-2 opacity-0 h-0") +
          " flex flex-wrap gap-2 items-center duration-200"
        }
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
          {languagesCount > 2 ? (
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
          {languagesCount > 3 ? (
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
        <button type="submit">
          <CiSquarePlus size={34} />
        </button>
        <button type="reset">
          <CiSquareRemove size={34} />
        </button>
      </form>
    </div>
  );
};

export default CardWordAdd;
