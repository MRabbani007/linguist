import { useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditBlockHeaderMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";
import { selectAllChapters } from "../chapters/chapterSlice";

const CardBlockEditHeader = ({ editBlockTab = "header", toggleEdit }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const chapters = useSelector(selectAllChapters);

  const [editBlockHeader, { isLoading }] = useEditBlockHeaderMutation();

  const [title, setTitle] = useState(displayBlock?.title);
  const [subtitle, setSubtitle] = useState(displayBlock?.subtitle);
  const [detail, setDetail] = useState(displayBlock?.detail);
  const [chapterID, setChapterID] = useState(chapters[0]?.id || "");

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleEdit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newBlock = {
          ...displayBlock,
          title,
          subtitle,
          detail,
          chapterID,
        };
        await editBlockHeader(newBlock).unwrap();

        toggleEdit("");
      } catch (err) {
        console.error("Failed to save the chapter", err);
      }
    }
  };

  const menuOptions =
    Array.isArray(chapters) &&
    chapters.map((item) => {
      return (
        <option value={item?.id} key={item?.id}>
          {item?.title}
        </option>
      );
    });

  const handleReset = () => {
    toggleEdit();
  };

  return (
    <form
      onSubmit={handleEdit}
      onReset={handleReset}
      className={
        editBlockTab === "header"
          ? "flex flex-row sm:flex-nowrap flex-wrap justify-center items-center gap-2 visible translate-y-0 dur"
          : "invisible -translate-y-3 h-0"
      }
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
      <div className="field">
        <select
          name="chapter_id"
          id="chapter_id"
          value={chapterID}
          onChange={(e) => setChapterID(e.target.value)}
        >
          <option value="">Select Chapter</option>
          {menuOptions}
        </select>
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

export default CardBlockEditHeader;
