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
import { TabContent, TabNavigator } from "../ui/MultiTabs";
import TextAreaField from "../ui/TextAreaField";

export default function FormSentenceEdit({
  sentence,
  setEdit,
  words,
}: {
  sentence: Sentence;
  setEdit: Dispatch<SetStateAction<boolean>>;
  words?: Word[];
}) {
  const [editSentence, { isLoading }] = useEditSentenceMutation();
  const [removeSentence] = useRemoveSentenceMutation();

  const [state, setState] = useState({ ...T_SENTENCE, ...sentence });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        const response = await editSentence(state).unwrap();

        if (response) {
          toast.success("Sentence Saved");
          setEdit(false);
        }
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

  const wordOptions = words
    ? words?.map((word) => ({
        value: word.id,
        label: word.first,
      }))
    : [];

  const [page, setPage] = useState("Sentence");

  return (
    <FormContainer
      title="Edit Sentence"
      type="edit"
      submitButton="Save"
      deleteButton={true}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      closeForm={setEdit}
    >
      <TabNavigator
        pages={["Sentence", "Details", "BaseWord"]}
        page={page}
        setPage={setPage}
      ></TabNavigator>
      <TabContent currentPage={page} pageName="Sentence">
        <SelectField
          options={levelOptions}
          label="Level"
          value={state.level ?? ""}
          onValueChange={(level) =>
            setState((curr) => ({ ...curr, level: +level }))
          }
        />
        <TextAreaField
          label="Sentence"
          name="text"
          value={state.text}
          handleChange={handleChange}
        />
        <TextAreaField
          label="Translation"
          name="translation"
          value={state.translation}
          handleChange={handleChange}
        />
      </TabContent>
      <TabContent currentPage={page} pageName="Details">
        <InputField
          label="Sort Index"
          name="sortIndex"
          type="number"
          value={state?.sortIndex}
          handleChange={handleChange}
        />
        <InputField
          label="Type"
          name="type"
          type="text"
          value={state?.type ?? ""}
          handleChange={handleChange}
        />
        <InputField
          label="Pronunce"
          name="pronunce"
          type="text"
          value={state?.pronunce ?? ""}
          handleChange={handleChange}
        />
      </TabContent>
      <TabContent currentPage={page} pageName="BaseWord">
        <SelectField
          options={wordOptions}
          label="Base Word"
          value={state.baseWordID ?? ""}
          onValueChange={(baseWordID) => {
            const word = words
              ? words.find((item) => item.id === baseWordID)
              : null;
            if (word) {
              setState((curr) => ({
                ...curr,
                baseWordID,
                baseWord: word.first,
                baseWordTranslation: word.second,
              }));
            } else {
              setState((curr) => ({
                ...curr,
                baseWordID: "",
                baseWord: "",
                baseWordTranslation: "",
              }));
            }
          }}
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
      </TabContent>
    </FormContainer>
  );
}
