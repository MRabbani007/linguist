import { useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditChapterMutation } from "./chapterSlice";
import { toast } from "react-toastify";

const ChapterHeaderEdit = ({ chapter, setEditChapter }) => {
  const [editChapter, { isLoading }] = useEditChapterMutation();

  const [title, setTitle] = useState(chapter?.title || "");
  const [subtitle, setSubtitle] = useState(chapter?.subtitle || "");
  const [detail, setDetail] = useState(chapter?.detail || "");
  const [chapterNo, setChapterNo] = useState(chapter?.chapterNo || 0);

  const canSave = !isLoading; // [title, subtitle, detail].every(Boolean) &&

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
          chapterNo,
        };
        await editChapter(newChapter).unwrap();
        toast.success("Chapter saved");
        setEditChapter(false);

        // handleChapterEdit(newChapter);
      } catch (err) {
        toast.error("Failed to save the chapter");
      }
    }
  };

  const handleReset = () => {
    setEditChapter(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit Chapter Title</h2>
        <div>
          <div className="field_group">
            <div className="field max-w-[25%]">
              <label htmlFor="chapter_number" className="field__label">
                Number
              </label>
              <input
                type="text"
                id="chapter_number"
                name="chapter_number"
                autoFocus
                placeholder="Number"
                title="Chapter Number"
                value={chapterNo}
                onChange={(e) => {
                  setChapterNo(e.target.value);
                }}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="chapter_title" className="field__label">
                Chapter Title
              </label>
              <input
                type="text"
                id="chapter_title"
                name="chapter_title"
                placeholder="Title"
                title="Chapter Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="field__input"
              />
            </div>
          </div>
          <div className="field_group">
            <div className="field">
              <label htmlFor="chapter_subtitle" className="field__label">
                Chapter SubTitle
              </label>
              <input
                type="text"
                id="chapter_subtitle"
                name="chapter_subtitle"
                value={subtitle}
                placeholder="SubTitle"
                title="Chapter SubTitle"
                onChange={(e) => {
                  setSubtitle(e.target.value);
                }}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="chapter_detail" className="field__label">
                Chapter Details
              </label>
              <input
                type="text"
                id="chapter_detail"
                name="chapter_detail"
                value={detail}
                placeholder="Detail"
                title="Chapter Detail"
                onChange={(e) => {
                  setDetail(e.target.value);
                }}
                className="field__input"
              />
            </div>
          </div>
          <p className="form-buttons">
            <button type="submit" title="Save" className="save">
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

export default ChapterHeaderEdit;
