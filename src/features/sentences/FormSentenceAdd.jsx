import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";
import { useAddSentenceMutation } from "./sentencesSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function FormSentenceAdd({ section = {}, setAdd = () => {} }) {
  const displayBlock = useSelector(selectDisplayBlock);
  const [addSentence, { isLoading }] = useAddSentenceMutation();

  const [closeOnFinish, setCloseOnFinish] = useState(false);
  const [change, setChange] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [sortIndex, setSortIndex] = useState(9);
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [pronunce, setPronunce] = useState("");
  const [baseWord, setBaseWord] = useState("");
  const [baseWordID, setBaseWordID] = useState("");
  const [baseWordTranslation, setBaseWordTranslation] = useState("");
  const [note, setNote] = useState("");
  const [show, setShow] = useState(true);
  const [level, setLevel] = useState(1);

  const canSave =
    !isLoading &&
    !isNaN(sortIndex) &&
    sortIndex >= 0 &&
    text + translation !== "";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const sentence = {
          id: crypto.randomUUID(),
          chapterID: section?.chapterID || "",
          lessonID: section?.id || "",
          sectionID: section?.id || "",
          text,
          translation,
          pronunce,
          sortIndex,
          baseWord,
          baseWordID,
          note,
          show,
          baseWordTranslation,
          level,
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

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add New Sentence</h2>
        <div>
          <div className="field_group">
            <div className="flex items-center gap-2">
              <input
                name="autoclose"
                type="checkbox"
                checked={closeOnFinish}
                onChange={() => setCloseOnFinish((curr) => !curr)}
              />
              <label htmlFor="autoclose">Auto Close</label>
            </div>
            <div className="field sm:max-w-[25%]">
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
                value={sortIndex}
                onChange={(e) => setSortIndex(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field max-w-[25%]">
              <label htmlFor="level" className="field__label">
                Level
              </label>
              <select
                name="level"
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
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
              <label htmlFor="sentence_baseWord" className="field__label">
                Base Word
              </label>
              <input
                id="sentence_baseWord"
                name="sentence_baseWord"
                type="text"
                title="Base Word"
                placeholder="Base Word"
                value={baseWord}
                onChange={(e) => setBaseWord(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="sentence_baseWordT" className="field__label">
                Base Word Translation
              </label>
              <input
                id="sentence_baseWordT"
                name="sentence_baseWordT"
                type="text"
                title="Base Word Translation"
                placeholder="Base Word Translation"
                value={baseWordTranslation}
                onChange={(e) => setBaseWordTranslation(e.target.value)}
                className="field__input"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="sentence_text" className="field__label">
              Sentence
            </label>
            <input
              id="sentence_text"
              name="sentence_text"
              type="text"
              autoFocus
              title="Sentence"
              placeholder="Sentence"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="sentence_translation" className="field__label">
              Translation
            </label>
            <input
              id="sentence_translation"
              name="sentence_translation"
              type="text"
              title="Translation"
              placeholder="Translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="sentence_pronunce" className="field__label">
              Pronunce
            </label>
            <input
              id="sentence_pronunce"
              name="sentence_pronunce"
              type="text"
              title="Pronunce"
              placeholder="Pronunce"
              value={pronunce}
              onChange={(e) => setPronunce(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add Sentence
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </FormContainer>
  );
}
