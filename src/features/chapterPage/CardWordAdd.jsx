import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

const CardWordAdd = ({ colSpan }) => {
  const { handleWordAdd, displayBlock } = useContext(GlobalContext);

  const [addWord, setAddWord] = useState(false);

  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [fourthInput, setFourthInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let word = {
      first: firstInput,
      second: secondInput,
      third: thirdInput,
      fourth: fourthInput,
    };
    handleWordAdd(displayBlock.id, word);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 my-2">
      <div className="flex flex-1 justify-center">
        <button
          onClick={() => {
            setAddWord(!addWord);
          }}
          className="btn btn-red"
        >
          Add Word
        </button>
      </div>
      {addWord ? (
        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={handleSubmit}
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
          <button type="submit" className="btn btn-red">
            Add
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default CardWordAdd;
