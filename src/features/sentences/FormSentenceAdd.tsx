import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useAddSentenceMutation } from "./sentencesSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { T_SENTENCE } from "@/data/templates";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

export default function FormSentenceAdd({
  section,
  setAdd,
}: {
  section: Section;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [addSentence, { isLoading }] = useAddSentenceMutation();

  const [state, setState] = useState(T_SENTENCE);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave =
    !isLoading &&
    !isNaN(state?.sortIndex) &&
    state?.sortIndex >= 0 &&
    state?.text + state?.translation !== "";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        const sentence = {
          ...state,
          chapterID: section?.chapterID || "",
          lessonID: section?.lessonID || "",
          sectionID: section?.id || "",
        };
        await addSentence(sentence);
        toast.success("Sentence Added");
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  const levelOptions = new Array(10).fill("").map((_, idx) => ({
    label: (idx + 1).toString(),
    value: (idx + 1).toString(),
  }));

  return (
    <FormContainer
      title="Add Sentence"
      submitButton="Add Sentence"
      onSubmit={handleSubmit}
      closeForm={setAdd}
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
    </FormContainer>
  );
}
