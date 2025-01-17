import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { selectChapters } from "../globals/globalsSlice";
import { T_LESSON } from "../../data/templates";
import InputField from "../ui/InputField";
import { useDeleteLessonMutation, useEditLessonMutation } from "./lessonSlice";
import SelectField from "../ui/SelectField";

export default function FormLessonEdit({
  lesson,
  setEdit,
}: {
  lesson: Lesson;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const chapters = useSelector(selectChapters);
  const [editLesson, { isLoading }] = useEditLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const [state, setState] = useState({ ...T_LESSON, ...lesson });

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
        const response = await editLesson(state);
        console.log(response);

        if (response) {
          toast.success("Lesson Saved");
          setEdit(false);
        } else {
          toast.error("Failed to save the Lesson");
        }
      } catch (err) {
        console.log(err);
        toast.error("Error: Failed to save the Lesson");
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this block?")) {
        await deleteLesson(lesson?.id).unwrap();
        toast.success("Lesson Deleted");
      }
    } catch (err) {
      toast.error("Failed to delete the Lesson");
    }
  };

  const lessonStateOptions = [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <FormContainer
      type="edit"
      title="Edit Lesson"
      deleteButton={true}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <InputField
        label="Lesson Number"
        name="lessonNo"
        type="number"
        value={state.lessonNo}
        handleChange={handleChange}
      />
      <InputField
        label="Sort Index"
        name="sortIndex"
        type="number"
        value={state.sortIndex}
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
      <InputField
        label="Level"
        name="level"
        type="text"
        value={state.level}
        handleChange={handleChange}
      />
      <InputField
        label="Learning Time"
        name="learningTime"
        type="number"
        value={state.learningTime}
        handleChange={handleChange}
      />
      <SelectField
        label="Lesson State"
        onValueChange={(val) => setState((curr) => ({ ...curr, state: val }))}
        options={lessonStateOptions}
      />
    </FormContainer>
  );
}
