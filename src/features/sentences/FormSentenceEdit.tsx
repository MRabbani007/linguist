import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  useEditSentenceMutation,
  useRemoveSentenceMutation,
} from "./sentencesSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { T_SENTENCE } from "@/data/templates";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { useSelector } from "react-redux";
import { selectLessons, selectSections } from "../globals/globalsSlice";

export default function FormSentenceEdit({
  sentence,
  setEdit,
}: {
  sentence: Sentence;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editSentence, { isLoading }] = useEditSentenceMutation();
  const [removeSentence] = useRemoveSentenceMutation();

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        await editSentence(state);
        toast.success("Sentence Saved");
        setEdit(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this sentence?")) {
      await removeSentence(sentence?.id);
      toast.success("Sentence Deleted");
      setEdit(false);
    }
  };

  const levelOptions = new Array(10).fill("").map((_, idx) => ({
    label: (idx + 1).toString(),
    value: (idx + 1).toString(),
  }));

  return (
    <FormContainer
      title="Edit Sentence"
      type="edit"
      submitButton="Save Sentence"
      deleteButton={true}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      closeForm={setEdit}
    >
      <InputField
        label="Sort Index"
        name="sortIndex"
        type="number"
        value={state?.sortIndex}
        handleChange={handleChange}
      />
      <SelectField
        options={levelOptions}
        label="Level"
        value={state.level ?? ""}
        onValueChange={(level) =>
          setState((curr) => ({ ...curr, level: +level }))
        }
      />
      <InputField
        label="Base Word"
        name="baseWord"
        type="text"
        value={state?.baseWord ?? ""}
        handleChange={handleChange}
      />
      <InputField
        label="Base Word Translation"
        name="baseWordTranslation"
        type="text"
        value={state?.baseWordTranslation ?? ""}
        handleChange={handleChange}
      />
      <InputField
        label="Sentence"
        name="text"
        type="text"
        value={state?.text ?? ""}
        handleChange={handleChange}
      />
      <InputField
        label="Translation"
        name="translation"
        type="text"
        value={state?.translation ?? ""}
        handleChange={handleChange}
      />
      <InputField
        label="Pronunce"
        name="pronunce"
        type="text"
        value={state?.pronunce ?? ""}
        handleChange={handleChange}
      />
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
