import React, { useState } from "react";
import { selectAllChapters } from "../chapters/chapterSlice";
import { useEditBlockHeaderMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function FormLessonEditHeader({ lesson, setEdit }) {
  const chapters = useSelector(selectAllChapters);
  const [editBlockHeader, { isLoading }] = useEditBlockHeaderMutation();

  const [title, setTitle] = useState(lesson?.title);
  const [subtitle, setSubtitle] = useState(lesson?.subtitle);
  const [detail, setDetail] = useState(lesson?.detail);
  const [chapterID, setChapterID] = useState(lesson?.chapterID);
  const [lessonNo, setLessonNo] = useState(lesson?.lessonNo || 0);

  const [firstLang, setFirstLang] = useState(lesson?.firstLang || "");
  const [secondLang, setSecondLang] = useState(lesson?.secondLang || "");
  const [thirdLang, setThirdLang] = useState(lesson?.thirdLang || "");
  const [fourthLang, setFourthLang] = useState(lesson?.fourthLang || "");

  const [imagesURL, setImagesURL] = useState(lesson?.imagesURL || "");

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
          firstLang,
          secondLang,
          thirdLang,
          fourthLang,
          imagesURL,
        };
        if (chapterID !== undefined) {
          newBlock.chapterID = chapterID;
        }
        await editBlockHeader(newBlock).unwrap();
        setEdit(false);
        toast.success("Lesson Saved");
      } catch (err) {
        toast.error("Failed to save the Lesson");
      }
    }
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
    <FormContainer
      type="edit"
      title="Edit Lesson Title"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field">
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
          disabled
          value={chapterID}
          onChange={(e) => setChapterID(e.target.value)}
        >
          <option value="">Select Chapter</option>
          {menuOptions}
        </select>
      </div>
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
      <div className="field">
        <label htmlFor="section_firstLang" className="field__label">
          First Language
        </label>
        <input
          type="text"
          id="section_firstLang"
          name="section_firstLang"
          value={firstLang}
          placeholder="First Language"
          className="field__input"
          onChange={(e) => setFirstLang(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="section_secondLang" className="field__label">
          Second Language
        </label>
        <input
          type="text"
          id="section_secondLang"
          name="section_secondLang"
          value={secondLang}
          placeholder="Second Language"
          className="field__input"
          onChange={(e) => setSecondLang(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="section_thirdLang" className="field__label">
          Third Language
        </label>
        <input
          type="text"
          id="section_thirdLang"
          name="section_thirdLang"
          value={thirdLang}
          placeholder="Third Language"
          className="field__input"
          onChange={(e) => setThirdLang(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="section_fourthLang" className="field__label">
          Fourth Language
        </label>
        <input
          type="text"
          id="section_fourthLang"
          name="section_fourthLang"
          value={fourthLang}
          placeholder="Fourth Language"
          className="field__input"
          onChange={(e) => setFourthLang(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="lesson_imagesURL" className="field__label">
          Images URL
        </label>
        <input
          type="text"
          id="lesson_imagesURL"
          name="lesson_imagesURL"
          value={imagesURL}
          placeholder="Images URL"
          className="field__input"
          onChange={(e) => setImagesURL(e.target.value)}
        />
      </div>
    </FormContainer>
  );
}
