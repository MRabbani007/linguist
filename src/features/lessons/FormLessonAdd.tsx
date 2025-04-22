import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { selectChapters } from "../globals/globalsSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import { T_LESSON } from "../../data/templates";
import InputField from "../ui/InputField";
import { useAddLessonMutation } from "./lessonSlice";
import SelectField from "../ui/SelectField";

export default function FormLessonAdd({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const chapters = useSelector(selectChapters);

  const [addLesson, { isLoading }] = useAddLessonMutation();

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
        const response = await addLesson(state).unwrap();
        console.log(response);
        toast.success("Lesson Added");
      } catch (err) {
        toast.error("Server Error");
      }
    }
  };

  const lessonStateOptions = [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <FormContainer
      onSubmit={handleSubmit}
      type="add"
      title="Add Lesson"
      submitButton="Add Lesson"
      closeForm={setAdd}
    >
      <SelectField
        label="Chapter"
        onValueChange={(chapterID) =>
          setState((curr) => ({ ...curr, chapterID }))
        }
        value={state?.chapterID}
        options={chapters.map((item) => ({
          value: item.id,
          label: item.title,
        }))}
      />
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
      <SelectField
        label="Lesson State"
        value={state?.state}
        onValueChange={(val) => setState((curr) => ({ ...curr, state: val }))}
        options={lessonStateOptions}
      />
    </FormContainer>
  );
}
