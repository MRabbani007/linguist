import React, { useState } from "react";
import { selectAllChapters } from "../chapters/chapterSlice";
import { useEditBlockHeaderMutation } from "./blockSlice";
import { useSelector } from "react-redux";

const LessonHeaderEdit = ({ lesson, setEdit }) => {
  const chapters = useSelector(selectAllChapters);
  const [editBlockHeader, { isLoading }] = useEditBlockHeaderMutation();

  const [title, setTitle] = useState(lesson?.title);
  const [subtitle, setSubtitle] = useState(lesson?.subtitle);
  const [detail, setDetail] = useState(lesson?.detail);
  const [chapterID, setChapterID] = useState(lesson?.chapterID);
  const [lessonNo, setLessonNo] = useState(lesson?.lessonNo || 0);

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newBlock = {
          ...lesson,
          title,
          subtitle,
          detail,
          lessonNo,
        };
        if (chapterID !== undefined) {
          newBlock.chapterID = chapterID;
        }
        await editBlockHeader(newBlock).unwrap();
        setEdit(false);
        alert("Lesson Saved");
      } catch (err) {
        console.error("Failed to save the Lesson", err);
      }
    }
  };

  const handleReset = () => {
    setEdit(false);
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

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit Lesson Title</h2>
        <div>
          <div className="field_group">
            <div className="field max-w-[25%]">
              <label htmlFor="lessonNo" className="field__label">
                Number
              </label>
              <input
                type="text"
                id="lessonNo"
                name="lessonNo"
                placeholder="Number"
                title="Lesson Number"
                className="field__input"
                value={lessonNo}
                onChange={(e) => {
                  setLessonNo(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label htmlFor="title" className="field__label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Lesson Title"
                title="Lesson Title"
                className="field__input"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label htmlFor="chapter_id" className="field__label">
                Chapter ID
              </label>
              <select
                id="chapter_id"
                name="chapter_id"
                className="field__input"
                required
                value={chapterID}
                onChange={(e) => setChapterID(e.target.value)}
              >
                <option value="">Select Chapter</option>
                {menuOptions}
              </select>
            </div>
          </div>
          <div className="field_group">
            <div className="field">
              <label htmlFor="subtitle" className="field__label">
                Sub-Title
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
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
                type="text"
                id="detail"
                name="detail"
                placeholder="Detail"
                className="field__input"
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                }}
              />
            </div>
          </div>
          <p className="form-buttons">
            <button type="submit" title="Add" className="add">
              Save
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LessonHeaderEdit;
