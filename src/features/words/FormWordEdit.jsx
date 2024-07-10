import { useEffect, useState } from "react";
import { useEditWordMutation, useRemoveWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectSections } from "../globals/globalsSlice";
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
  type: "",
  gender: "",
  sectionID: "",
};

const WORD_TYPE = {
  Verb: "v",
  Noun: "n",
  Pronoun: "p",
  Adjective: "adj",
  Adverb: "adv",
  Phrase: "ph",
  None: "",
};

const WORD_GENDER = {
  Masculine: "m",
  Feminine: "f",
  Neuter: "n",
  None: "",
};

export default function FormWordEdit({ word = initialState, setViewEdit }) {
  const [editWord, { isLoading }] = useEditWordMutation();
  const [removeWord] = useRemoveWordMutation();
  const displayBlock = useSelector(selectDisplayBlock);
  // const sections = useSelector(selectSections);

  const [state, setState] = useState({ ...word });
  // const [selected, setSelected] = useState({ ...word });

  // const sectionOptions = sections.map((section, index) => (
  //   <option value={index} key={index}>
  //     {section?.title}
  //   </option>
  // ));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      await removeWord(word.id);
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
        let newWord = {
          ...word,
          ...state,
        };

        // if (selected !== "") {
        //   newWord.sectionID = sections[selected]?.id;
        // }

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

  // useEffect(() => {
  //   setSelected(() => {
  //     const idx = sections.findIndex(
  //       (section) => section?.id === word?.sectionID
  //     );
  //     if (idx >= 0) return idx;
  //     return "";
  //   });
  // }, [word, sections]);

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
      <div className="field">
        <span className="field__label">Word Type</span>
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(WORD_TYPE).map((item, index) => {
            return (
              <div className="flex items-center gap-1">
                <input
                  key={index}
                  type="radio"
                  name="type"
                  id={"type_" + item}
                  checked={state?.type === WORD_TYPE[item]}
                  value={WORD_TYPE[item]}
                  onChange={handleChange}
                />
                <label htmlFor={"type_" + item}>{item}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="field">
        <span className="field__label">Word Gender</span>
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(WORD_GENDER).map((item, index) => {
            return (
              <div className="flex items-center gap-1">
                <input
                  key={index}
                  type="radio"
                  name="gender"
                  id={"gender_" + item}
                  checked={state?.gender === WORD_GENDER[item]}
                  value={WORD_GENDER[item]}
                  onChange={handleChange}
                />
                <label htmlFor={"gender_" + item}>{item}</label>
              </div>
            );
          })}
        </div>
      </div>
      {/* Word Type */}
      {/* <div className="field">
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
      </div> */}
      {/* Word Gender */}
      {/* <div className="field">
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
      </div> */}
      {/* Word Form */}
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
      {/* Move to section */}
      {/* <div className="field">
        <label htmlFor="move-word" className="field__label">
          Move to Section:
        </label>
        <select
          name="move-word-section"
          id="move-word-section"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="field__input"
        >
          <option value="">Select Section</option>
          {sectionOptions}
        </select>
      </div> */}
      {/* Word Note */}
      <div className="field">
        <label htmlFor="note" className="field__label">
          Word note
        </label>
        <input
          type="text"
          id="note"
          name="note"
          placeholder="Word note"
          value={state?.note || ""}
          onChange={handleChange}
          className="field__input"
        />
      </div>
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
      {/* Word Image */}
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
      {/* Image URL */}
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
