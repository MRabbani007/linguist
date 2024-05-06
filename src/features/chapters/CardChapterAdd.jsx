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
      {viewAddChapter && (
        <div className="form-container">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <h2>Add New Chapter</h2>
            <div>
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
                  autoFocus
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
      )}
    </div>
  );
};

export default CardChapterAdd;
