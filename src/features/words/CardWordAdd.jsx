import { useEffect, useState } from "react";
import { useAddWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectLanguagesCount,
} from "../globals/globalsSlice";
import { toast } from "react-toastify";

const CardWordAdd = ({ sectionID = "", setAdd }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const languagesCount = useSelector(selectLanguagesCount);

  const [addWord, { isLoading }] = useAddWordMutation();

  // const [statusMessage, setStatusMessage] = useState(null);
  // const [mssgClass, setMssgClass] = useState("");

  // useEffect(() => {
  //   setMssgClass(() =>
  //     statusMessage === "Success"
  //       ? { borderWidth: "4px", borderColor: "green" }
  //       : statusMessage === "Error"
  //       ? { borderWidth: "4px", borderColor: "red" }
  //       : statusMessage === "Provide required values"
  //       ? { borderWidth: "4px", borderColor: "grey" }
  //       : ""
  //   );
  // }, [statusMessage]);

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
          sectionID,
          first: firstInput,
          second: secondInput,
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
