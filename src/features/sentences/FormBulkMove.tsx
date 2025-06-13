import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useSelector } from "react-redux";
import { selectLessons, selectSections } from "../globals/globalsSlice";
import { useBulkMoveSentencesMutation } from "./sentencesSlice";
import { toast } from "react-toastify";
import SelectField from "../ui/SelectField";

export default function FormBulkMove({
  sentences,
  setEdit,
  setSelected,
}: {
  sentences: string[];
  setEdit: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<string[]>>;
}) {
  const [moveSentences, { isLoading }] = useBulkMoveSentencesMutation();

  const [state, setState] = useState({ lessonID: "", sectionID: "" });

  const lessons = useSelector(selectLessons);
  const lessonOptions = lessons.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const sections = useSelector(selectSections);
  const sectionOptions =
    sections && Array.isArray(sections)
      ? sections
          .filter((item) => item.lessonID === state?.lessonID)
          .map((item) => ({
            label: item.title,
            value: item.id,
          }))
      : [];

  const canSave = true && !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        const response = await moveSentences({ sentences, ...state }).unwrap();
        if (response) {
          toast.success("Sentences Saved");
          setSelected([]);
          setEdit(false);
        }
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  return (
    <FormContainer
      title="Move Sentences"
      type="edit"
      submitButton="Save"
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
