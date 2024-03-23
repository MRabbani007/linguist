import { useContext, useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove, CiTrash } from "react-icons/ci";
import { GlobalContext } from "../../context/GlobalState";

const CardBlockEdit = ({ block, toggleEdit }) => {
  const { handleBlockEditHeader } = useContext(GlobalContext);

  const [title, setTitle] = useState(block.title);
  const [subtitle, setSubtitle] = useState(block.subtitle);
  const [detail, setDetail] = useState(block.detail);

  const handleEdit = (e) => {
    e.preventDefault();
    handleBlockEditHeader(block.id, title, subtitle, detail);
    toggleEdit();
  };
  const handleReset = () => {
    toggleEdit();
  };

  return (
    <form
      onSubmit={handleEdit}
      onReset={handleReset}
      className="flex sm:flex-nowrap flex-wrap items-center gap-1 px-2 "
    >
      <div className="field">
        <label htmlFor="title" className="field__label">
          Section Title
        </label>
        <input
          name="title"
          type="text"
          value={title}
          placeholder="Section Title"
          className="field__input"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="subtitle" className="field__label">
          SubTitle
        </label>
        <input
          name="subtitle"
          type="text"
          placeholder="Sub Title"
          className="field__input"
          value={subtitle}
          onChange={(e) => {
            setSubtitle(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="detail" className="field__label">
          Detail
        </label>
        <input
          name="detail"
          type="text"
          placeholder="Detail"
          className="field__input"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />
      </div>
      <button type="submit">
        <CiSquareCheck className="icon" />
      </button>
      <button type="reset">
        <CiSquareRemove className="icon" />
      </button>
    </form>
  );
};

export default CardBlockEdit;
