import { useState } from "react";
import { useAddSectionMutation } from "./sectionSlice";
import {
  selectDisplayBlock,
  selectDisplayChapter,
} from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SectionAdd({ setAdd }) {
  const displayBlock = useSelector(selectDisplayBlock);
  const displayChapter = useSelector(selectDisplayChapter);

  const [addSection, { isLoading }] = useAddSectionMutation();

  const [sortIndex, setSortIndex] = useState(9);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const canSave =
    !isLoading &&
    (title !== "" || subtitle !== "") &&
    !isNaN(sortIndex) &&
    sortIndex >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const section = {
          id: crypto.randomUUID(),
          chapterID: displayChapter?.id,
          lessonID: displayBlock?.id,
          title,
          subtitle,
          sortIndex,
        };
        await addSection(section);
        toast.success("Section Added");
        setAdd(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add New Section</h2>
        <div>
          <div className="field max-w-[25%]">
            <label htmlFor="section_number" className="field__label">
              Number
            </label>
            <input
              id="section_number"
              name="section_number"
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
          <div className="field">
            <label htmlFor="section_title" className="field__label">
              Section Title
            </label>
            <input
              id="section_title"
              name="section_title"
              type="text"
              autoFocus
              title="Section Title"
              placeholder="Section Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="section_subtitle" className="field__label">
              Section Sub-Title
            </label>
            <input
              id="section_subtitle"
              name="section_subtitle"
              type="text"
              title="Section Sub-Title"
              placeholder="Section Sub-Title"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add Section
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
