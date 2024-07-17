import { useState } from "react";
import {
  useEditChapterMutation,
  useRemoveChapterMutation,
} from "./chapterSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function FormChapterEdit({ chapter, setEdit }) {
  const [editChapter, { isLoading }] = useEditChapterMutation();
  const [removeChapter] = useRemoveChapterMutation();

  const [title, setTitle] = useState(chapter?.title || "");
  const [subtitle, setSubtitle] = useState(chapter?.subtitle || "");
  const [detail, setDetail] = useState(chapter?.detail || "");
  const [chapterNo, setChapterNo] = useState(chapter?.chapterNo || 0);
  const [level, setLevel] = useState(chapter?.chapterNo || 0);
  const [learningTime, setLearningTime] = useState(chapter?.chapterNo || 0);

  const canSave = !isLoading && !isNaN(learningTime); // [title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newChapter = {
          ...chapter,
          title,
          subtitle,
          detail,
          chapterNo,
          level,
          learningTime,
        };
        await editChapter(newChapter).unwrap();
        toast.success("Chapter saved");
        setEdit(false);

        // handleChapterEdit(newChapter);
      } catch (err) {
        toast.error("Failed to save the chapter");
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this Chapter?")) {
        await removeChapter(chapter.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  return (
    <FormContainer
      title="Edit Chapter"
      type="edit"
      submitButton="Save Chapter"
      deleteButton={true}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field">
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
      <div className="field">
        <label htmlFor="level" className="field__label">
          Level
        </label>
        <input
          type="text"
          id="level"
          name="level"
          value={level}
          placeholder="Level"
          title="Level"
          onChange={(e) => {
            setLevel(e.target.value);
          }}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="learningTime" className="field__label">
          Learning Time
        </label>
        <input
          type="text"
          id="learningTime"
          name="learningTime"
          value={learningTime}
          placeholder="Learning Time"
          title="Learning Time"
          onChange={(e) => {
            setLearningTime(e.target.value);
          }}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
