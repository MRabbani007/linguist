import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";

const CardBlockEditContent = ({ editBlockDetails, toggleEdit }) => {
  const { words, displayBlock, editMode, displayMode, handleBlockEditContent } =
    useContext(GlobalContext);

  const [imagesURL, setImagesURL] = useState(displayBlock?.imagesURL || "");
  const [introduction, setIntroduction] = useState(
    displayBlock?.introduction || ""
  );
  const [caption, setCaption] = useState(displayBlock?.caption || "");
  const [text, setText] = useState(displayBlock?.text || "");
  const [notes, setNotes] = useState(displayBlock?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    let block = {
      id: displayBlock.id,
      imagesURL,
      introduction,
      caption,
      notes,
      text,
    };
    handleBlockEditContent(block);
    toggleEdit();
  };

  const handleReset = () => {
    toggleEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={
        editBlockDetails
          ? "flex flex-col justify-center items-center gap-2 visible translate-y-0 dur"
          : "invisible -translate-y-3"
      }
    >
      <h3 className="btn btn-yellow">Edit Content</h3>
      <div className="flex gap-2">
        <div className="field">
          <label htmlFor="section_imagesURL" className="field__label">
            Images URL
          </label>
          <input
            type="text"
            id="section_imagesURL"
            name="section_imagesURL"
            value={imagesURL}
            placeholder="Images URL"
            className="field__input"
            onChange={(e) => setImagesURL(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="section_introduction" className="field__label">
            Introduction
          </label>
          <input
            type="text"
            id="section_introduction"
            name="section_introduction"
            value={introduction}
            placeholder="Introduction"
            className="field__input"
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
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
