import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";

const CardBlockEditDetails = ({ editBlockDetails, toggleEdit }) => {
  const { words, displayBlock, editMode, displayMode, handleBlockEditHeader } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(displayBlock?.title || "");
  const [subtitle, setSubTitle] = useState(displayBlock?.subtitle || "");
  const [detail, setDetail] = useState(displayBlock?.detail || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    let block = {
      id: displayBlock.id,
      title,
      subtitle,
      detail,
    };
    handleBlockEditHeader(block);
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
      <h2 className="btn btn-yellow">Edit Header</h2>
      <div className="flex gap-2">
        <div className="field">
          <label htmlFor="section_title" className="field__label">
            Section Title
          </label>
          <input
            type="text"
            id="section_title"
            name="section_title"
            value={title}
            placeholder="Section Title"
            className="field__input"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="section_subtitle" className="field__label">
            Section Sub-Title
          </label>
          <input
            type="text"
            id="section_subtitle"
            name="section_subtitle"
            value={subtitle}
            placeholder="Section Sub-Title"
            className="field__input"
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="field">
          <label htmlFor="section_detail" className="field__label">
            Detail
          </label>
          <input
            type="text"
            id="section_detail"
            name="section_detail"
            value={detail}
            placeholder="Detail"
            className="field__input"
            onChange={(e) => setDetail(e.target.value)}
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

export default CardBlockEditDetails;
