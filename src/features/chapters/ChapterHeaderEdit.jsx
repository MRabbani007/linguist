import { useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditChapterMutation } from "./chapterSlice";

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

        handleReset();

        // handleChapterEdit(newChapter);
      } catch (err) {
        console.error("Failed to save the chapter", err);
      }
    }
  };

  const handleReset = () => {
    setEditChapter((curr) => !curr);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="text-center flex gap-2"
    >
      <div className="">
        <div className="flex gap-2">
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
            className="w-[100px]"
          />
          <input
            type="text"
            value={title}
            id="chapter_title"
            name="chapter_title"
            autoFocus
            placeholder="Title"
            title="Chapter Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="flex-1"
          />
        </div>
        <div>
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
          />
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
          />
        </div>
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

export default ChapterHeaderEdit;
