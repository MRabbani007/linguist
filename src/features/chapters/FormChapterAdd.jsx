import { useState } from "react";
import { useAddChapterMutation } from "./chapterSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../globals/globalsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function FormChapterAdd({ setAdd }) {
  const language = useSelector(selectLanguage);
  const [addChapter, { isLoading }] = useAddChapterMutation();

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
        setAdd(false);
      } catch (err) {
        toast.error("Failed to add the chapter");
      }
    }
  };

  return (
    <FormContainer
      title="Add Chapter"
      type="add"
      submitButton="Add Chapter"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
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
    </FormContainer>
  );
}
