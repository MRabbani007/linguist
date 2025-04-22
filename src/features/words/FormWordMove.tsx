import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../../components/FormContainer";
import SelectField from "../ui/SelectField";
import { T_WORD } from "@/data/templates";
import { useEditWordMutation } from "./wordsSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectLessons, selectSections } from "../globals/globalsSlice";

export default function FormWordMove({
  word,
  setEdit,
}: {
  word: Word;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editWord] = useEditWordMutation();

  const [state, setState] = useState<Word>({ ...T_WORD, ...word });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await editWord(state);
      toast.success("Word Updated");
      setEdit(false);
    } catch (err) {
      toast.error("Error");
    }
  };

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

  return (
    <FormContainer
      type="edit"
      title="Move Word"
      submitButton="Save"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <SelectField
        label="Lesson"
        options={lessonOptions}
        onValueChange={(lessonID) =>
          setState((curr) => ({ ...curr, lessonID }))
        }
      />
      <SelectField
        label="Section"
        options={sectionOptions}
        onValueChange={(sectionID) =>
          setState((curr) => ({ ...curr, sectionID }))
        }
      />
    </FormContainer>
  );
}
