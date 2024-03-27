import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useAddChapterMutation } from "./chapterSlice";

const CardChapterAdd = () => {
  const [addChapter, { isLoading }] = useAddChapterMutation();

  const [viewAddChapter, setViewAddChapter] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [detail, setDetail] = useState("");

  const canSave = [title, subtitle, detail].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let chapter = {
          id: crypto.randomUUID(),
          title,
          subtitle,
          detail,
        };
        await addChapter(chapter).unwrap();

        setViewAddChapter(false);
      } catch (err) {
        console.error("Failed to add the chapter", err);
      }
    }
  };

  const handleReset = () => {
    setViewAddChapter(false);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => setViewAddChapter(!viewAddChapter)}
        className="btn btn-red"
      >
        Add Chapter
      </button>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={
          (viewAddChapter ? "visible " : "invisible -translate-y-4 ") +
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
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
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
