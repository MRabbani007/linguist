import { useState } from "react";
import { useEditSectionListContentMutation } from "./sectionListSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function ListEdit({ list, setEdit }) {
  const [editSectionListContent, { isLoading }] =
    useEditSectionListContentMutation();

  const [title, setTitle] = useState(list?.title);
  const [text, setText] = useState(list?.text);
  const [notes, setNotes] = useState(list?.notes);
  const [type, setType] = useState(list?.type);
  const [sortIndex, setSortIndex] = useState(list?.sortIndex);

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sectionList = {
      id: list.id,
      type,
      title,
      text,
      notes,
      sortIndex,
    };
    if (canSave) {
      await editSectionListContent(sectionList);
      toast.success("List Saved");
      setEdit(false);
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit List"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field_group">
        <input
          name="list_type"
          id="list_type_OL"
          type="radio"
          title="Ordered List"
          value={"OL"}
          checked={type === "OL"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="list_type_OL">Ordered List</label>
        <input
          name="list_type"
          id="list_type_UL"
          type="radio"
          title="Un-Ordered List"
          value={"UL"}
          checked={type === "UL"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="list_type_UL">Un-Ordered List</label>
      </div>
      <div className="field_group">
        <div className="field max-w-[25%]">
          <label htmlFor="sort_index" className="field__label">
            Number
          </label>
          <input
            id="sort_index"
            type="text"
            title="sortIndex"
            placeholder="sortIndex"
            value={sortIndex}
            onChange={(e) => setSortIndex(e.target.value)}
            className="field__input"
          />
        </div>
        {/* Title */}
        <div className="field">
          <label htmlFor="list_title" className="field__label">
            Title
          </label>
          <input
            id="list_title"
            type="text"
            title="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="field__input"
          />
        </div>
      </div>
      {/* Text */}
      <div className="field w-full">
        <label htmlFor="list_text" className="field__label">
          Text
        </label>
        <input
          id="list_text"
          type="text"
          title="List Text"
          placeholder="List Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="field__input"
        />
      </div>
      {/* Notes */}
      <div className="field w-full">
        <label htmlFor="list_note" className="field__label">
          Notes
        </label>
        <input
          id="list_note"
          type="text"
          title="Note"
          placeholder="Note"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
