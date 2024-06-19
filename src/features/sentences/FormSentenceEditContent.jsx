import React, { useState } from "react";
import {
  useEditSentenceMutation,
  useRemoveSentenceMutation,
} from "./sentencesSlice";
import { toast } from "react-toastify";
import { ACTIONS } from "../../data/actions";
import FormContainer from "../components/FormContainer";

export default function FormSentenceEditContent({ sentence, setEdit }) {
  const [editSentence, { isLoading }] = useEditSentenceMutation();
  const [removeSentence] = useRemoveSentenceMutation();

  const [sortIndex, setSortIndex] = useState(sentence?.sortIndex || 9);
  const [text, setText] = useState(sentence?.text || "");
  const [translation, setTranslation] = useState(sentence?.translation || "");
  const [pronunce, setPronunce] = useState(sentence?.pronunce || "");
  const [baseWord, setBaseWord] = useState(sentence?.baseWord || "");
  const [baseWordTranslation, setBaseWordTranslation] = useState(
    sentence?.baseWordTranslation || ""
  );
  const [baseWordID, setBaseWordID] = useState(sentence?.baseWordID || "");
  const [type, setType] = useState(sentence?.type || "");
  const [group, setGroup] = useState(sentence?.group || "");
  const [caption, setCaption] = useState(sentence?.caption || "");
  const [tCaption, setTCaption] = useState(sentence?.tCaption || "");
  const [note, setNote] = useState(sentence?.note || "");
  const [show, setShow] = useState(sentence?.show || true);
  const [level, setLevel] = useState(sentence?.level || 1);

  const canSave = !isLoading && !isNaN(sortIndex) && sortIndex >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const newSentence = {
          ...sentence,
          text,
          translation,
          pronunce,
          sortIndex,
          baseWord,
          baseWordID,
          baseWordTranslation,
          caption,
          tCaption,
          type,
          group,
          note,
          show,
          level,
        };
        await editSentence({
          type: ACTIONS.EDIT_SENTENCE_CONTENT,
          sentence: newSentence,
        });
        toast.success("Sentence Saved");
        setEdit(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this sentence?")) {
      await removeSentence(sentence?.id);
      toast.success("Sentence Deleted");
      setEdit(false);
    }
  };

  return (
    <FormContainer
      title="Edit Sentence"
      type="edit"
      submitButton="Save Sentence"
      deleteButton={true}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      closeForm={setEdit}
    >
      <div className="field_group">
        <div className="field max-w-[25%]">
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
      <div className="field_group">
        <div className="field">
          <label htmlFor="type" className="field__label">
            Type
          </label>
          <input
            id="type"
            name="type"
            type="text"
            title="Type"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="field__input"
          />
        </div>
        <div className="field">
          <label htmlFor="group" className="field__label">
            Group
          </label>
          <input
            id="group"
            name="group"
            type="text"
            title="Group"
            placeholder="Group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="field__input"
          />
        </div>
        <div className="field">
          <label htmlFor="caption" className="field__label">
            Caption
          </label>
          <input
            id="caption"
            name="caption"
            type="text"
            title="Caption"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="field__input"
          />
        </div>
        <div className="field">
          <label htmlFor="tCaption" className="field__label">
            Translation Caption
          </label>
          <input
            id="tCaption"
            name="tCaption"
            type="text"
            title="Translation Caption"
            placeholder="Translation Caption"
            value={tCaption}
            onChange={(e) => setTCaption(e.target.value)}
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
      <div className="field_group">
        <div className="flex items-center gap-2">
          <input
            name="show_sentence"
            type="checkbox"
            checked={show}
            onChange={() => setShow((curr) => !curr)}
          />
          <label htmlFor="show_sentence">Show Sentence</label>
        </div>
      </div>
    </FormContainer>
  );
}
