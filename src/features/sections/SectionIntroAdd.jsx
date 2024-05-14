import { useState } from "react";
import { useAddSectionIntroMutation } from "./sectionSlice";
import { toast } from "react-toastify";

export default function SectionIntroAdd({ section, setAdd }) {
  const [addSectionIntro, { isLoading }] = useAddSectionIntroMutation();

  const [input, setInput] = useState("");

  const canSave = !isLoading && input !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addSectionIntro({ id: section?.id, introduction: input });
      toast.success("Intro item added");
      setAdd(false);
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Section Introduction</h2>
        <div>
          <div className="field w-full">
            <label htmlFor="add_intro_item" className="field__label">
              Introduction
            </label>
            <input
              id="add_intro_item"
              name="add_intro_item"
              type="text"
              value={input}
              autoFocus
              required
              title="Introduction"
              placeholder="Introduction"
              onChange={(e) => setInput(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
