import { useEffect, useState } from "react";
import { useEditWordMutation, useRemoveWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

const initialState = {
  sortIndex: 0,
  first: "",
  second: "",
  third: "",
  fourth: "",
  firstCaption: "",
  secondCaption: "",
};

export default function FormWordEdit({ word = initialState, setViewEdit }) {
  const [editWord, { isLoading }] = useEditWordMutation();
  const [removeWord] = useRemoveWordMutation();
  const displayBlock = useSelector(selectDisplayBlock);

  const [state, setState] = useState({ ...word });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    try {
      removeWord(word.id);
      toast.success("Word Saved");
    } catch (err) {
      toast.error("Error deleting word");
    }
  };

  const canSave = !isLoading;

  const label_1 =
    displayBlock?.firstLang === "Russian"
      ? "RU"
      : displayBlock?.firstLang === "English"
      ? "EN"
      : displayBlock?.firstLang === "Pronunciation"
      ? "Pronunced"
      : displayBlock?.firstLang;

  const label_2 =
    displayBlock?.secondLang === "Russian"
      ? "RU"
      : displayBlock?.secondLang === "English"
      ? "EN"
      : displayBlock?.secondLang === "Pronunciation"
      ? "Pronunced"
      : displayBlock?.secondLang;

  const label_3 =
    displayBlock?.thirdLang === "Russian"
      ? "RU"
      : displayBlock?.thirdLang === "English"
      ? "EN"
      : displayBlock?.thirdLang === "Pronunciation"
      ? "Pronunced"
      : displayBlock?.thirdLang;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = Object.fromEntries(new FormData(e.target).entries());
    // console.log(data);

    if (canSave) {
      try {
        const newWord = {
          ...word,
          ...state,
        };

        await editWord(newWord).unwrap();
        toast.success("Word Saved");
        setViewEdit(false);
      } catch (err) {
        toast.error("Server Error");
      }
    }
  };

  useEffect(() => {
    setState({ ...word });
  }, [word]);

  return (
    <FormContainer
      type="edit"
      title="Edit Word"
      submitButton="Save Word"
      onSubmit={handleSubmit}
      closeForm={setViewEdit}
      deleteButton={true}
      onDelete={handleDelete}
    >
      <div className="field">
        <label htmlFor="sortIndex" className="field__label">
          Sort Index
        </label>
        <input
          type="text"
          id="sortIndex"
          name="sortIndex"
          placeholder={"Sort Index"}
          value={state?.sortIndex}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      {/* Word */}
      {/* First Word */}
      <div className="field">
        <label htmlFor="first" className="field__label">
          {label_1}
        </label>
        <input
          type="text"
          id="first"
          name="first"
          placeholder={displayBlock?.firstLang || "First Language"}
          autoFocus
          value={state?.first}
          onChange={handleChange}
          className="field__input"
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
          {label_2}
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
      <div className="field">
        <label htmlFor="type" className="field__label">
          Word Type
        </label>
        <input
          type="text"
          id="type"
          name="type"
          placeholder="Word Type: v,n,adj,adv,phrase"
          value={state?.type}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="gender" className="field__label">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          placeholder="Gender: m,f,n"
          value={state?.gender}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="form" className="field__label">
          Word Form
        </label>
        <input
          type="text"
          id="form"
          name="form"
          placeholder="Word Form"
          value={state?.form}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      {/* Third Word */}
      {displayBlock?.thirdLang ? (
        <div className="field">
          <label htmlFor="third" className="field__label">
            {label_3}
          </label>
          <input
            type="text"
            id="third"
            name="third"
            placeholder={displayBlock.thirdLang || "Third Language"}
            value={state?.third}
            onChange={handleChange}
            className="field__input"
          />
        </div>
      ) : null}
      {/* Fourth Word */}
      {displayBlock?.fourthLang ? (
        <div className="field">
          <label htmlFor="fourth" className="field__label">
            {displayBlock?.fourthLang}:
          </label>
          <input
            type="text"
            id="fourth"
            name="fourth"
            value={state?.fourth}
            placeholder={displayBlock?.fourthLang || "Fourth Language"}
            onChange={handleChange}
            className="field__input"
          />
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="image" className="field__label">
          Word image
        </label>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Word image"
          value={state?.image}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="imageURL" className="field__label">
          Word imageURL
        </label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          placeholder="Word imageURL"
          value={state?.imageURL}
          onChange={handleChange}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
