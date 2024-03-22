import { useContext, useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove, CiTrash } from "react-icons/ci";
import { GlobalContext } from "../../context/GlobalState";

const CardBlockTitle = ({ block }) => {
  const { handleBlockOpen, handleBlockEditHeader } = useContext(GlobalContext);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(block.title);
  const [subtitle, setSubtitle] = useState(block.subtitle);
  const [detail, setDetail] = useState(block.detail);

  const handleEdit = (e) => {
    e.preventDefault();
    handleBlockEditHeader(block.id, title, subtitle, detail);
    setEdit(false);
  };
  const handleReset = () => {
    setEdit(!edit);
  };

  const blockOpen = () => {
    handleBlockOpen(block);
  };

  return (
    <div className="group">
      {edit ? (
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
      ) : (
        <div className="flex flex-col gap-2 bg-zinc-300 rounded-lg w-[300px] h-full">
          {/* Header */}
          <div className="flex justify-between items-center bg-sky-800 text-yellow-100 py-2 px-4 rounded-t-lg">
            <span>{block?.firstLang + " / " + block?.secondLang}</span>
            <span>
              <CiEdit
                className="icon invisible group-hover:visible "
                onClick={() => setEdit(!edit)}
              />
              <CiTrash className="icon invisible group-hover:visible " />
            </span>
          </div>
          <div className="flex-1">
            <div
              className="flex items-center justify-center gap-2 py-2 px-4 text-zinc-900 cursor-pointer hover:text-yellow-600 duration-200"
              onClick={blockOpen}
            >
              <span className="font-semibold">{block?.title}</span>
              <span>{block?.subtitle}</span>
            </div>
            <div className=" py-2 px-4">
              <span>{block?.detail}</span>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-between items-center bg-sky-800 text-yellow-100 py-2 px-4 rounded-b-lg">
            <span>Beginner</span>
            <span>
              <CiSquareCheck className="icon" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardBlockTitle;
