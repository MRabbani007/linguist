import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useEditSectionLessonIDMutation } from "./sectionSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import SelectField from "../ui/SelectField";
import { useSelector } from "react-redux";
import { selectLessons } from "../globals/globalsSlice";

// TODO: fetch lessons, set options and update edit mutation
export default function FormSectionMove({
  section,
  setEdit,
}: {
  section: Section;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, setState] = useState(section);
  const [editSectionLessonID] = useEditSectionLessonIDMutation();

  const lessons = useSelector(selectLessons);
  const options = Array.isArray(lessons)
    ? lessons.map((item) => ({ label: item.title, value: item.id }))
    : [];

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const selected = lessons.find((item) => item.id === state.lessonID);

      if (!selected) return null;

      const response = await editSectionLessonID({
        id: section?.id,
        chapterID: selected.chapterID,
        lessonID: selected.id,
      });

      console.log(response);

      toast.success("Section Moved");
      setEdit(false);
    } catch (error) {
      toast.error("Error moving section");
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Move Section to Lesson"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <SelectField
        label="Lesson"
        options={options}
        onValueChange={(lessonID) =>
          setState((curr) => ({ ...curr, lessonID }))
        }
      />
    </FormContainer>
  );
}
