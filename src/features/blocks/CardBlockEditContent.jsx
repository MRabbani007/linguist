import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useEditBlockContentMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";

const CardBlockEditContent = ({ editBlockTab, toggleEdit }) => {
  const displayBlock = useSelector(selectDisplayBlock);

  const [editBlockContent, { isLoading }] = useEditBlockContentMutation();

  const [caption, setCaption] = useState(displayBlock?.caption || "");
  const [text, setText] = useState(displayBlock?.text || "");
  const [notes, setNotes] = useState(displayBlock?.notes || "");

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newBlock = {
          id: displayBlock?.id,
          imagesURL,
          // introduction,
          // caption,
          // notes,
          // text,
        };
        const res = await editBlockContent(newBlock).unwrap();

        toggleEdit("");
      } catch (err) {
        console.error("Failed to save the section", err);
      }
    }
  };

  const handleReset = () => {
    toggleEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={
        editBlockTab === "content"
          ? "flex flex-col justify-center items-center gap-2 visible translate-y-0 dur"
          : "invisible -translate-y-3 h-0"
      }
    >
      <div className="hidden gap-2">
        <div className="field">
          <label htmlFor="section_caption" className="field__label">
            Caption
          </label>
          <input
            type="text"
            id="section_caption"
            name="section_caption"
            value={caption}
            placeholder="Caption"
            className="field__input"
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="section_text" className="field__label">
            Text
          </label>
          <input
            type="text"
            id="section_text"
            name="section_text"
            value={text}
            placeholder="Text"
            className="field__input"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="section_notes" className="field__label">
            Notes
          </label>
          <input
            type="text"
            id="section_notes"
            name="section_notes"
            value={notes}
            placeholder="Notes"
            className="field__input"
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit">
          <CiSquarePlus className="icon text-green-600" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon text-red-600" />
        </button>
      </div>
    </form>
  );
};

export default CardBlockEditContent;
