import React, { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useEditDefinitionConentMutation } from "./definitionsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function DefinitionEdit({ definition, setEdit }) {
  const [editDefinitionContent, { isLoading }] =
    useEditDefinitionConentMutation();

  const [title, setTitle] = useState(definition?.title);
  const [text, setText] = useState(definition?.text);
  const [caption, setCaption] = useState(definition?.caption);
  const [notes, setNotes] = useState(definition?.notes);
  const [sortIndex, setSortIndex] = useState(definition?.sortIndex);

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDefinition = {
      ...definition,
      title,
      text,
      caption,
      notes,
      sortIndex,
    };
    console.log(newDefinition);
    if (canSave) {
      await editDefinitionContent(newDefinition);
      toast.success("Definition Modified");
      setEdit(false);
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Definition"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field_group">
        <div className="field max-w-[25%]">
          <label htmlFor="def_sortindex" className="field__label">
            Sort Index
          </label>
          <input
            id="def_sortindex"
            name="def_sortindex"
            type="text"
            title="Sort Index"
            placeholder="Sort Index"
            value={sortIndex}
            onChange={(e) => setSortIndex(e.target.value)}
            className="field__input"
          />
        </div>
        <div className="field">
          <label htmlFor="def_title" className="field__label">
            Title
          </label>
          <input
            id="def_title"
            name="def_title"
            type="text"
            title="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="field__input"
          />
        </div>
      </div>
      <div className="field w-full">
        <label htmlFor="def_text" className="field__label">
          Text
        </label>
        <input
          id="def_text"
          name="def_text"
          type="text"
          title="Def. Text"
          placeholder="Def. Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="field__input"
        />
      </div>
      <div className="field_group">
        <div className="field">
          <label htmlFor="def_caption" className="field__label">
            Caption
          </label>
          <input
            id="def_caption"
            name="def_caption"
            type="text"
            title="Caption"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="field__input"
          />
        </div>
        <div className="field">
          <label htmlFor="def_note" className="field__label">
            Note
          </label>
          <input
            id="def_note"
            name="def_note"
            type="text"
            title="Note"
            placeholder="Note"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="field__input"
          />
        </div>
      </div>
    </FormContainer>
  );
}
