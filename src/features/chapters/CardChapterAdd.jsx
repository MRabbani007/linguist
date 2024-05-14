import { useState } from "react";
import { useAddChapterMutation } from "./chapterSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../globals/globalsSlice";
import { toast } from "react-toastify";

const CardChapterAdd = () => {
  const language = useSelector(selectLanguage);
  const [addChapter, { isLoading }] = useAddChapterMutation();

  const [viewAddChapter, setViewAddChapter] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [detail, setDetail] = useState("");

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let chapter = {
          id: crypto.randomUUID(),
          langID: language?.id,
          title,
          subtitle,
          detail,
        };
        await addChapter(chapter).unwrap();
        toast.success("Chapter Added");
        setViewAddChapter(false);
      } catch (err) {
        toast.error("Failed to add the chapter");
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
                  Add Chapter
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
