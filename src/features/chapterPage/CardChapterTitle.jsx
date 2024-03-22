import { useContext, useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove, CiTrash } from "react-icons/ci";
import { GlobalContext } from "../../context/GlobalState";
import { PiDotOutline } from "react-icons/pi";
import TimeAgo from "../common/TimeAgo";

const CardChapterTitle = ({ chapter }) => {
  const {
    handleChapterOpen,
    handleChapterEdit,
    handleChapterRemove,
    editMode,
  } = useContext(GlobalContext);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(chapter?.title || "");
  const [subtitle, setSubTitle] = useState(chapter?.subtitle || "");
  const [detail, setDetail] = useState(chapter?.detail || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChapterEdit(chapter.id, title, subtitle, detail);
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <div className="flex items-center gap-1 group">
      {edit ? (
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <input
            type="text"
            value={title}
            placeholder="Title"
            title="Chapter Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            value={subtitle}
            placeholder="SubTitle"
            title="Chapter SubTitle"
            onChange={(e) => {
              setSubTitle(e.target.value);
            }}
          />
          <input
            type="text"
            value={detail}
            placeholder="Detail"
            title="Chapter Detail"
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          />
          <button type="submit">
            <CiSquareCheck className="icon" />
          </button>
          <button type="reset">
            <CiSquareRemove className="icon" />
          </button>
        </form>
      ) : (
        <div className="min-w-[300px]">
          <div className="card__header">
            <span
              className="font-semibold cursor-pointer"
              onClick={() => handleChapterOpen(chapter)}
            >
              {chapter?.title || ""}
            </span>
            {editMode && (
              <span>
                <CiEdit
                  className="icon invisible group-hover:visible"
                  onClick={() => setEdit(true)}
                />
                <CiTrash
                  className="icon invisible group-hover:visible"
                  onClick={() => handleChapterRemove(chapter.id)}
                />
              </span>
            )}
          </div>
          <div className="card__body">
            <p>{chapter?.subtitle || ""}</p>
            <p>{chapter?.detail || ""}</p>
          </div>
          <div className="card__footer">
            <span>
              <TimeAgo timestamp={chapter?.createDate} />
            </span>
            <span>10% Completed</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardChapterTitle;
