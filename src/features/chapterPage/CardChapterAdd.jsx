import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";

import { handleAddChapter } from "../../context/chapterSlice";
import { nanoid } from "@reduxjs/toolkit";

const CardChapterAdd = () => {
  const { handleChapterAdd } = useContext(GlobalContext);

  const dispatch = useDispatch();

  const [addChapter, setAddChapter] = useState(false);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChapterAdd(title, subTitle, detail);
    // dispatch(handleAddChapter(title, subTitle, detail));
    setAddChapter(false);
  };

  // use to enable/ disable form submit button
  const canSave = Boolean(title) && Boolean(subTitle);

  const handleReset = () => {
    setAddChapter(false);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => setAddChapter(!addChapter)}
        className="btn btn-red"
      >
        Add Chapter
      </button>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={
          (addChapter ? "visible " : "invisible -translate-y-4 ") +
          " flex flex-row items-center justify-center gap-3 translate-y-0 duration-200"
        }
      >
        <h3 className="w-full">Add New Chapter</h3>
        <div className="field">
          <label htmlFor="chapter_title" className="field__label">
            Title
          </label>
          <input
            type="text"
            id="chapter_title"
            name="chapter_title"
            placeholder="Title"
            className="field__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="chapter_subtitle" className="field__label">
            Sub-Title
          </label>
          <input
            type="text"
            id="chapter_subtitle"
            name="chapter_subtitle"
            placeholder="Sub-Title"
            className="field__input"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="chapter_detail" className="field__label">
            detail
          </label>
          <input
            type="text"
            id="chapter_detail"
            name="chapter_detail"
            placeholder="Detail"
            className="field__input"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <button type="submit" disabled={!canSave}>
            <CiSquarePlus className="icon" />
          </button>
          <button type="reset">
            <CiSquareRemove className="icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardChapterAdd;
