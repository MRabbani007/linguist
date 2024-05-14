import { useState } from "react";
import { useEditTableContentMutation } from "./tablesSlice";
import { toast } from "react-toastify";

export default function TableEditContent({ table, setEdit }) {
  const [editTableContent, { isLoading }] = useEditTableContentMutation();
  const [title, setTitle] = useState(table?.title);
  const [subtitle, setSubtitle] = useState(table?.subtitle);
  const [text, setText] = useState(table?.text);
  const [notes, setNotes] = useState(table?.notes);
  const [sortIndex, setSortIndex] = useState(table?.sortIndex);

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTable = {
      ...table,
      title,
      subtitle,
      text,
      notes,
      sortIndex,
    };
    if (canSave) {
      await editTableContent(newTable);
      toast.success("Table Modified");
      setEdit(false);
    }
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset} className="">
        <h2>Edit Table Title</h2>
        <div>
          <div className="field_group">
            <div className="field">
              <input
                type="text"
                title="Title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field">
              <input
                type="text"
                title="Sub-Title"
                placeholder="Sub-Title"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="field__input"
              />
            </div>
          </div>
          <div className="field w-full">
            <input
              type="text"
              title="Table Text"
              placeholder="Table Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field_group">
            <div className="field max-w-[25%]">
              <input
                type="text"
                title="sortIndex"
                placeholder="sortIndex"
                value={sortIndex}
                onChange={(e) => setSortIndex(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field w-full">
              <input
                type="text"
                title="Note"
                placeholder="Note"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="field__input"
              />
            </div>
          </div>
          <p className="form-buttons">
            <button type="submit" className="add">
              Save
            </button>
            <button type="reset" className="cancel">
              Cancel
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
