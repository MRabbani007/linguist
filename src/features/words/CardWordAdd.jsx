import { useEffect, useState } from "react";
import { useAddWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";
import { toast } from "react-toastify";

const CardWordAdd = ({ sectionID = "", setAdd }) => {
  const displayBlock = useSelector(selectDisplayBlock);

  const [addWord, { isLoading }] = useAddWordMutation();

  const [sortIndex, setSortIndex] = useState(0);
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [fourthInput, setFourthInput] = useState("");
  const [firstCaption, setFirstCaption] = useState("");
  const [secondCaption, setSecondCaption] = useState("");

  const canSave = !isLoading; //[firstInput, secondInput, thirdInput, fourthInput].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let word = {
          id: crypto.randomUUID(),
          chpaterID: displayBlock.chapterID,
          blockID: displayBlock.id,
          sectionID,
          sortIndex,
          first: firstInput,
          firstCaption,
          second: secondInput,
          secondCaption,
          third: thirdInput,
          fourth: fourthInput,
        };
        const res = await addWord(word).unwrap();
        toast.success("Word Added");
        // setStatusMessage("Success");
      } catch (err) {
        toast.error("Error");
        // setStatusMessage("Error");
        // console.error("Failed to add the word", err);
      }
    } else {
      toast.info("Provide Required Values");
      setStatusMessage("Provide required values");
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  // // handle status message
  // useEffect(() => {
  //   const timer = setTimeout(() => setStatusMessage(null), 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [statusMessage]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Word</h2>
        <div>
          {/* Sort Index */}
          <div className="field max-w-[25%]">
            <label htmlFor="edit_sortIndex" className="field__label">
              Sort Index
            </label>
            <input
              type="text"
              id="edit_sortIndex"
              name="edit_sortIndex"
              placeholder={"Sort Index"}
              autoFocus
              value={sortIndex}
              onChange={(e) => {
                setSortIndex(e.target.value);
              }}
              className="field__input"
            />
          </div>
          {/* First word */}
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
              <label htmlFor="edit_firstWord_caption" className="field__label">
                First Word Caption
              </label>
              <input
                type="text"
                id="edit_firstWord_caption"
                name="edit_firstWord_caption"
                placeholder="First Word Caption"
                value={firstCaption}
                onChange={(e) => {
                  setFirstCaption(e.target.value);
                }}
                className="field__input"
              />
            </div>
          </div>
          {/* Second Word */}
          <div className="field_group">
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
            <div className="field">
              <label htmlFor="edit_secondWord_caption" className="field__label">
                Second Word Caption
              </label>
              <input
                type="text"
                id="edit_secondWord_caption"
                name="edit_secondWord_caption"
                placeholder="Second Word Caption"
                value={secondCaption}
                onChange={(e) => {
                  setSecondCaption(e.target.value);
                }}
                className="field__input"
              />
            </div>
          </div>
          <div className="field_group">
            {displayBlock?.thirdLang ? (
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
            {displayBlock?.fourthLang ? (
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
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
          {/* Status Message */}
          {/* <p className={"py-2 px-4 rounded-md"} style={{ ...mssgClass }}>
            {statusMessage}
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default CardWordAdd;
