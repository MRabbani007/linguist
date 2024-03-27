import { useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditChapterMutation } from "./chapterSlice";

const CardChapterEdit = ({ chapter, handleReset }) => {
  const [editChapter, { isLoading }] = useEditChapterMutation();

  const [title, setTitle] = useState(chapter?.title || "");
  const [subtitle, setSubtitle] = useState(chapter?.subtitle || "");
  const [detail, setDetail] = useState(chapter?.detail || "");

  const canSave = [title, subtitle, detail].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newChapter = {
          id: chapter?.id,
          title,
          subtitle,
          detail,
          state: "private",
        };
        await editChapter(newChapter).unwrap();

        handleReset();

        // handleChapterEdit(newChapter);
      } catch (err) {
        console.error("Failed to save the chapter", err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col gap-2"
    >
      <div className="field">
        <label htmlFor="chapter_title" className="field_label">
          Title
        </label>
        <input
          type="text"
          value={title}
          id="chapter_title"
          name="chapter_title"
          className="field_input"
          autoFocus
          placeholder="Title"
          title="Chapter Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="chapter_subtitle" className="field_label">
          Subtitle
        </label>
        <input
          type="text"
          id="chapter_subtitle"
          name="chapter_subtitle"
          value={subtitle}
          placeholder="SubTitle"
          className="field_input"
          title="Chapter SubTitle"
          onChange={(e) => {
            setSubtitle(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="chapter_detail" className="field_label">
          Detail
        </label>
        <input
          type="text"
          className="field_input"
          id="chapter_detail"
          name="chapter_detail"
          value={detail}
          placeholder="Detail"
          title="Chapter Detail"
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />
      </div>
      <span>
        <button type="submit">
          <CiSquareCheck className="icon" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon" />
        </button>
      </span>
    </form>
  );
};

export default CardChapterEdit;
