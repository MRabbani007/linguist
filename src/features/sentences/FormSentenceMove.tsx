import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useEditSentenceMutation } from "./sentencesSlice";
import { useSelector } from "react-redux";
import { selectLessons, selectSections } from "../globals/globalsSlice";
import { T_SENTENCE } from "@/data/templates";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import SelectField from "../ui/SelectField";

export default function FormSentenceMove({
  sentence,
  setEdit,
}: {
  sentence: Sentence;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editSentence, { isLoading }] = useEditSentenceMutation();

  const [state, setState] = useState({ ...T_SENTENCE, ...sentence });

  const lessons = useSelector(selectLessons);
  const lessonOptions = lessons.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const sections = useSelector(selectSections);
  const sectionOptions = Array.isArray(sections)
    ? sections
        .filter((item) => item.lessonID === state?.lessonID)
        .map((item) => ({
          label: item.title,
          value: item.id,
        }))
    : [];

  const canSave = !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        const response = await editSentence(state).unwrap();
        console.log(response);
        toast.success("Sentence Saved");
        setEdit(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  return (
    <FormContainer
      title="Move Sentence"
      type="edit"
      submitButton="Save Sentence"
      deleteButton={false}
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <SelectField
        label="Lesson"
        value={state?.lessonID ?? ""}
        options={lessonOptions}
        onValueChange={(lessonID) =>
          setState((curr) => ({ ...curr, lessonID }))
        }
      />
      <SelectField
        label="Section"
        value={state?.sectionID ?? ""}
        options={sectionOptions}
        onValueChange={(sectionID) =>
          setState((curr) => ({ ...curr, sectionID }))
        }
      />
    </FormContainer>
  );
}
