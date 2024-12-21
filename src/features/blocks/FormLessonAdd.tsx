import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { selectChapters } from "../globals/globalsSlice";
import { useAddBlockMutation } from "./blockSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { T_LESSON } from "../../data/templates";
import InputField from "../ui/InputField";

export default function FormLessonAdd({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const chapters = useSelector(selectChapters);

  const [addBlock, { isLoading }] = useAddBlockMutation();

  const [state, setState] = useState(T_LESSON);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        let block = {
          ...state,
          id: crypto.randomUUID(),
          createDate: new Date(),
        };

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
      <InputField
        label="Lesson Number"
        name="lessonNo"
        type="number"
        value={state.lessonNo}
        handleChange={handleChange}
      />
      <InputField
        label="Lesson Title"
        name="title"
        type="text"
        value={state.title}
        handleChange={handleChange}
      />
      <InputField
        label="Lesson SubTitle"
        name="subtitle"
        type="text"
        value={state.subtitle}
        handleChange={handleChange}
      />
      <InputField
        label="Lesson Detail"
        name="detail"
        type="text"
        value={state.detail}
        handleChange={handleChange}
      />
      <InputField
        label="First Word"
        name="firstLang"
        type="text"
        value={state.firstLang}
        handleChange={handleChange}
      />
      <InputField
        label="Second Word"
        name="secondLang"
        type="text"
        value={state.secondLang}
        handleChange={handleChange}
      />
      <InputField
        label="Third Word"
        name="thirdLang"
        type="text"
        value={state.thirdLang}
        handleChange={handleChange}
      />
      <InputField
        label="Fourth Word"
        name="fourthLang"
        type="text"
        value={state.fourthLang}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
