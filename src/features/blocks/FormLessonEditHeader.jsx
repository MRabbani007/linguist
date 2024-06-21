import React, { useState } from "react";
import { selectAllChapters } from "../chapters/chapterSlice";
import { useEditBlockHeaderMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

const initialState = {
  title: "",
  subtitle: "",
  detail: "",
  lessonNo: 0,
  firstLang: "",
  secondLang: "",
  thirdLang: "",
  fourthLang: "",
  introduction: [],
  caption: "",
  notes: "",
  text: "",
  imagesURL: "",
  learningTime: 0,
  langID: "",
};

export default function FormLessonEditHeader({ lesson, setEdit }) {
  const chapters = useSelector(selectAllChapters);
  const [editBlockHeader, { isLoading }] = useEditBlockHeaderMutation();

  const [state, setState] = useState({ ...initialState, ...lesson });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newBlock = { state };
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
      title="Edit Lesson"
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
          value={state?.lessonNo}
          onChange={handleChange}
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
          value={state?.title}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="chapter_id" className="field__label">
          Chapter ID
        </label>
        <select
          id="chapter_id"
          name="chapter_id"
          disabled
          value={state?.chapterID}
          onChange={handleChange}
          className="field__input"
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
          value={state?.subtitle}
          onChange={handleChange}
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
          value={state?.detail}
          onChange={handleChange}
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
          placeholder="First Language"
          value={state?.firstLang}
          onChange={handleChange}
          className="field__input"
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
          placeholder="Second Language"
          value={state?.secondLang}
          onChange={handleChange}
          className="field__input"
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
          placeholder="Third Language"
          value={state?.thirdLang}
          onChange={handleChange}
          className="field__input"
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
          placeholder="Fourth Language"
          value={state?.fourthLang}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="imagesURL" className="field__label">
          Images URL
        </label>
        <input
          type="text"
          id="imagesURL"
          name="imagesURL"
          placeholder="Images URL"
          value={state?.imagesURL}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="learningTime" className="field__label">
          <span>Learning Time</span>
          <span>
            <i>{" (minutes)"}</i>
          </span>
        </label>
        <input
          type="text"
          id="learningTime"
          name="learningTime"
          title="Learning Time"
          placeholder="Learning Time (minutes)"
          value={state?.learningTime}
          onChange={handleChange}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
