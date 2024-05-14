import { useState } from "react";
import { CiCirclePlus, CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useAddDefinitionMutation } from "./definitionsSlice";
import { toast } from "react-toastify";

export default function DefinitionAdd({ lessonID, sectionID = "", setAdd }) {
  const [addDefinition, { isLoading }] = useAddDefinitionMutation();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [caption, setCaption] = useState("");
  const [notes, setNotes] = useState("");

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const definition = {
      id: crypto.randomUUID(),
      lessonID,
      sectionID,
      title,
      text,
      caption,
      notes,
    };
    if (canSave) {
      await addDefinition(definition);
      toast.success("Definition Created");
      setAdd(false);
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Definition</h2>
        <div className="">
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
          <div className="field w-full">
            <input
              type="text"
              title="Def. Text"
              placeholder="Def. Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field_group">
            <div className="field w-full">
              <input
                type="text"
                title="Caption"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
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
              Add
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
