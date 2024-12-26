import React, { useState } from "react";
import { useAddSentenceMutation } from "./sentencesSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

const initialState = {
  text: "",
  translation: "",
  pronunce: "",
  sortIndex: 0,
  baseWord: "",
  baseWordID: "",
  note: "",
  show: true,
  baseWordTranslation: "",
  level: 1,
};

export default function FormSentenceAdd({ section = {}, setAdd = () => {} }) {
  const [addSentence, { isLoading }] = useAddSentenceMutation();

  const [closeOnFinish, setCloseOnFinish] = useState(false);

  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave =
    !isLoading &&
    !isNaN(state?.sortIndex) &&
    state?.sortIndex >= 0 &&
    state?.text + state?.translation !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const sentence = {
          id: crypto.randomUUID(),
          chapterID: section?.chapterID || "",
          lessonID: section?.lessonID || "",
          sectionID: section?.id || "",
          ...state,
        };
        await addSentence(sentence);
        toast.success("Sentence Added");
        if (closeOnFinish === true) {
          setAdd(false);
        }
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  return (
    <FormContainer
      title="Add Sentence"
      submitButton="Add Sentence"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <div className="field">
        <label htmlFor="sentence_number" className="field__label">
          Number
        </label>
        <input
          id="sentence_number"
          name="sentence_number"
          type="number"
          title="Number"
          placeholder="Number"
          min={0}
          step={1}
          value={state?.sortIndex}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="level" className="field__label">
          Level
        </label>
        <select
          name="level"
          id="level"
          value={state?.level}
          onChange={handleChange}
          className="bg-transparent"
        >
          {new Array(10).fill("").map((item, idx) => (
            <option value={idx + 1} key={idx}>
              {idx + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="baseWord" className="field__label">
          Base Word
        </label>
        <input
          id="baseWord"
          name="baseWord"
          type="text"
          title="Base Word"
          placeholder="Base Word"
          value={state?.baseWord}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="baseWordTranslation" className="field__label">
          Base Word Translation
        </label>
        <input
          id="baseWordTranslation"
          name="baseWordTranslation"
          type="text"
          title="Base Word Translation"
          placeholder="Base Word Translation"
          value={state?.baseWordTranslation}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="text" className="field__label">
          Sentence
        </label>
        <input
          id="text"
          name="text"
          type="text"
          autoFocus
          title="Sentence"
          placeholder="Sentence"
          value={state?.text}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="translation" className="field__label">
          Translation
        </label>
        <input
          id="translation"
          name="translation"
          type="text"
          title="Translation"
          placeholder="Translation"
          value={state?.translation}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="pronunce" className="field__label">
          Pronunce
        </label>
        <input
          id="pronunce"
          name="pronunce"
          type="text"
          title="Pronunce"
          placeholder="Pronunce"
          value={state?.pronunce}
          onChange={handleChange}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
