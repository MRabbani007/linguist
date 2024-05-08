import { useState } from "react";
import { useAddWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectLanguagesCount,
} from "../globals/globalsSlice";

const CardWordAdd = ({ setAdd }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const languagesCount = useSelector(selectLanguagesCount);

  const [addWord, { isLoading }] = useAddWordMutation();

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
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Word</h2>
        <div>
          <div className="field_group">
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
          <div className="field_group">
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
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardWordAdd;
