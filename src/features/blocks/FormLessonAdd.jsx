import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectChapters } from "../globals/globalsSlice";
import { useAddBlockMutation } from "./blockSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

const initialState = {
  chapterID: "",
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

const lastValues = {};

export default function FormLessonAdd({ setAdd }) {
  const chapters = useSelector(selectChapters);

  const [addBlock, { isLoading }] = useAddBlockMutation();

  const [state, setState] = useState(initialState);

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
        let block = {
          ...state,
          id: crypto.randomUUID(),
          createDate: new Date(),
        };
        console.log(block);
        const res = await addBlock(block).unwrap();
        toast.success("Lesson Added");
      } catch (err) {
        toast.error("Server Error");
      }
    }
  };

  const menuOptions =
    Array.isArray(chapters) &&
    chapters.map((item, index) => {
      return (
        <option value={item?.id} key={index}>
          {item?.title}
        </option>
      );
    });

  return (
    <FormContainer
      onSubmit={handleSubmit}
      type="add"
      title="Add Lesson"
      submitButton="Add Lesson"
      closeForm={setAdd}
    >
      <div className="field">
        <label htmlFor="chapterID" className="field__label">
          Chapter
        </label>
        <select
          id="chapterID"
          name="chapterID"
          value={state?.chapterID}
          onChange={handleChange}
          className="field__input"
        >
          <option value="">Select Chapter</option>
          {menuOptions}
        </select>
      </div>
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
          Lesson Title
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
        <label htmlFor="firstLang" className="field__label">
          First Language
        </label>
        <input
          type="text"
          id="firstLang"
          name="firstLang"
          placeholder="First Language"
          title="First Language"
          className="field__input"
          value={state?.firstLang}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="secondLang" className="field__label">
          Second Language
        </label>
        <input
          type="text"
          id="secondLang"
          name="secondLang"
          placeholder="Second Language"
          className="field__input"
          value={state?.secondLang}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="thirdLang" className="field__label">
          Third Language
        </label>
        <input
          type="text"
          id="thirdLang"
          name="thirdLang"
          placeholder="Number"
          title="Third Language"
          className="field__input"
          value={state?.thirdLang}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="fourthLang" className="field__label">
          Fourth Language
        </label>
        <input
          type="text"
          id="fourthLang"
          name="fourthLang"
          placeholder="Fourth Language"
          title="Fourth Language"
          className="field__input"
          value={state?.fourthLang}
          onChange={handleChange}
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
          title="Images URL"
          className="field__input"
          value={state?.imagesURL}
          onChange={handleChange}
        />
      </div>
    </FormContainer>
  );
}
