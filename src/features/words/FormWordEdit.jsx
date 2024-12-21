import { useEffect, useState } from "react";
import { useEditWordMutation, useRemoveWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { T_WORD } from "../../data/templates";

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

const SUBJECT = {
  Animals: "Animals",
  Food: "Food",
  TimeDate: "Time & Date",
  DaysMonths: "Days & months",
  Weather: "Weather",
  Health: "Health",
  Numbers: "Numbers",
  Colors: "Colors",
  People: "People",
  Professions: "Professions",
  Communication: "Communication",
  Sports: "Sports",
  Home: "Home",
  Vehicles: "Vehicles",
};

const LEVEL = {
  1: "A1",
  2: "A2",
  3: "B1",
  4: "B2",
  5: "C1",
  6: "C2",
};

export default function FormWordEdit({ word = T_WORD, setViewEdit }) {
  const [editWord, { isLoading }] = useEditWordMutation();
  const [removeWord] = useRemoveWordMutation();
  const displayBlock = useSelector(selectDisplayBlock);

  const [page, setPage] = useState("content");
  const [state, setState] = useState({ ...word });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this word?")) {
        await removeWord(word?.id);
        toast.success("Word Deleted");
        setViewEdit(false);
      }
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
      : "Third Language " + displayBlock?.thirdLang;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        let newWord = {
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
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPage("content")}
          className={
            (page === "content" ? "bg-zinc-200" : "") +
            " py-2 px-4 rounded-md duration-200"
          }
        >
          Content
        </button>
        <button
          type="button"
          onClick={() => setPage("headers")}
          className={
            (page === "headers" ? "bg-zinc-200" : "") +
            " py-2 px-4 rounded-md duration-200"
          }
        >
          Headers
        </button>
        <button
          type="button"
          onClick={() => setPage("image")}
          className={
            (page === "image" ? "bg-zinc-200" : "") +
            " py-2 px-4 rounded-md duration-200"
          }
        >
          Image
        </button>
      </div>
      <div
        className={
          (page === "content" ? "" : "hidden") +
          " flex flex-col gap-4 self-stretch items-stretch"
        }
      >
        {/* Sort Index */}
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
        {/* Word */}
        {/* First Word */}
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
        {/* Second Word */}
        <div className="field__row">
          <label htmlFor="second" className="field__label">
            {label_2}
          </label>
          <input
            type="text"
            id="second"
            name="second"
            placeholder={displayBlock?.secondLang || "Second Language"}
            className="field__input__row"
            value={state?.second}
            onChange={handleChange}
          />
        </div>
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
        {/* Third Word */}
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
        {/* Fourth Word */}
        {displayBlock?.fourthLang ||
          (true && (
            <div className="field__row">
              <label htmlFor="fourth" className="field__label">
                {"Fourth Lang" + displayBlock?.fourthLang}
              </label>
              <input
                type="text"
                id="fourth"
                name="fourth"
                value={state?.fourth}
                placeholder={displayBlock?.fourthLang || "Fourth Language"}
                onChange={handleChange}
                className="field__input__row"
              />
            </div>
          ))}
      </div>
      <div
        className={
          (page === "headers" ? "" : "hidden") +
          " flex flex-col gap-4 self-stretch items-stretch"
        }
      >
        {/* Type */}
        <div className="field__row">
          <span className="field__label">Word Type</span>
          <select
            id="type"
            name="type"
            value={state?.type}
            onChange={handleChange}
            className="field__input__row"
          >
            <option value="">Select Type</option>
            {Object.keys(WORD_TYPE).map((item, index) => {
              return (
                <option key={index} value={WORD_TYPE[item]}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {/* Gender */}
        <div className="field__row">
          <span className="field__label">Word Gender</span>
          <select
            name="gender"
            id="gender"
            value={state?.gender}
            onChange={handleChange}
            className="field__input__row"
          >
            <option value="">Select Gender</option>
            {Object.keys(WORD_GENDER).map((item, index) => {
              return (
                <option key={index} value={WORD_GENDER[item]}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {/* Level */}
        <div className="field__row">
          <span className="field__label">Level</span>
          <select
            name="level"
            id="level"
            value={state?.level}
            onChange={handleChange}
            className="field__input__row"
          >
            <option value="">Select Level</option>
            {Object.keys(LEVEL).map((item, index) => {
              return (
                <option key={index} value={item}>
                  {LEVEL[item]}
                </option>
              );
            })}
          </select>
        </div>
        {/* Subject */}
        <div className="field__row">
          <span className="field__label">Subject</span>
          <select
            name="subject"
            id="subject"
            value={state?.subject}
            onChange={handleChange}
            className="field__input__row"
          >
            <option value="">Select Subject</option>
            {Object.keys(SUBJECT).map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {/* Word Form */}
        <div className="field__row">
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
            className="field__input__row"
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
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
      </div>
      <div
        className={
          (page === "image" ? "" : "hidden") +
          " flex flex-col gap-4 self-stretch items-stretch"
        }
      >
        {/* Word Image */}
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
        {/* Image URL */}
        <div className="field__row">
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
            className="field__input__row"
          />
        </div>
      </div>
    </FormContainer>
  );
}
