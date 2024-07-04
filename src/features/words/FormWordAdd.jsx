import { useEffect, useState } from "react";
import { useAddWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import useLocalStorage from "../../hooks/useLocalStorage";

const initialState = {
  sortIndex: 0,
  first: "",
  second: "",
  third: "",
  fourth: "",
  firstCaption: "",
  secondCaption: "",
};

export default function FormWordAdd({ sectionID = "", setAdd }) {
  const displayBlock = useSelector(selectDisplayBlock);
  const [value, setValue] = useLocalStorage("WordAdd", initialState);

  const [addWord, { isLoading }] = useAddWordMutation();
  const [clearOnSubmit, setClearOnSubmit] = useState(false);

  const [state, setState] = useState(value);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading; //[firstInput, secondInput, thirdInput, fourthInput].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue(state);
    if (canSave) {
      try {
        let word = {
          ...state,
          id: crypto.randomUUID(),
          chpaterID: displayBlock.chapterID,
          blockID: displayBlock.id,
          sectionID,
        };
        const res = await addWord(word).unwrap();
        toast.success("Word Added");
        if (clearOnSubmit) {
          setState(initialState);
        }
      } catch (err) {
        toast.error("Error");
      }
    } else {
      toast.info("Provide Required Values");
      setStatusMessage("Provide required values");
    }
  };

  const handleClear = () => {
    setState(initialState);
  };

  return (
    <FormContainer
      type="add"
      title="Add Word"
      submitButton="Add Word"
      clearButton={true}
      onSubmit={handleSubmit}
      closeForm={setAdd}
      handleClear={handleClear}
      clearOnSubmit={clearOnSubmit}
      setClearOnSubmit={setClearOnSubmit}
    >
      {/* Sort Index */}
      <div className="field">
        <label htmlFor="sortIndex" className="field__label">
          Sort Index
        </label>
        <input
          type="text"
          id="sortIndex"
          name="sortIndex"
          placeholder={"Sort Index"}
          autoFocus
          value={state?.sortIndex}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      {/* First word */}
      <div className="field">
        <label htmlFor="first" className="field__label">
          {displayBlock?.firstLang || "First Language"}
        </label>
        <input
          type="text"
          id="first"
          name="first"
          className="field__input"
          placeholder={displayBlock?.firstLang || "First Language"}
          value={state?.first}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="firstCaption" className="field__label">
          First Word Caption
        </label>
        <input
          type="text"
          id="firstCaption"
          name="firstCaption"
          placeholder="First Word Caption"
          value={state?.firstCaption}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      {/* Second Word */}
      <div className="field">
        <label htmlFor="second" className="field__label">
          {displayBlock?.secondLang || "Second Language"}
        </label>
        <input
          type="text"
          id="second"
          name="second"
          placeholder={displayBlock?.secondLang || "Second Language"}
          className="field__input"
          value={state?.second}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="secondCaption" className="field__label">
          Second Word Caption
        </label>
        <input
          type="text"
          id="secondCaption"
          name="secondCaption"
          placeholder="Second Word Caption"
          value={state?.secondCaption}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      {displayBlock?.thirdLang ? (
        <div className="field">
          <label htmlFor="third" className="field__label">
            {displayBlock?.thirdLang || "Third Language"}
          </label>
          <input
            type="text"
            id="third"
            name="third"
            placeholder={displayBlock?.thirdLang || "Third Language"}
            className="field__input"
            value={state?.third}
            onChange={handleChange}
          />
        </div>
      ) : null}
      {displayBlock?.fourthLang ? (
        <div className="field">
          <label htmlFor="fourth" className="field__label">
            {displayBlock?.fourthLang || "Fourth Language"}
          </label>
          <input
            type="text"
            id="fourth"
            name="fourth"
            placeholder={displayBlock?.fourthLang || "Fourth Language"}
            className="field__input"
            value={state?.fourth}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </FormContainer>
  );
}
