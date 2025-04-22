import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useAddSentenceMutation } from "./sentencesSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import { T_SENTENCE } from "@/data/templates";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import MultiTabs, { TabContent, TabNavigator } from "../ui/MultiTabs";
import TextAreaField from "../ui/TextAreaField";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function FormSentenceAdd({
  section,
  setAdd,
  words,
}: {
  section: Section;
  setAdd: Dispatch<SetStateAction<boolean>>;
  words?: Word[];
}) {
  const [value, setValue] = useLocalStorage("SentenceAdd", T_SENTENCE);

  const [addSentence, { isLoading }] = useAddSentenceMutation();

  const [state, setState] = useState<Sentence>(value);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    setValue(state);
    if (!canSave) {
      return null;
    }

    try {
      const sentence = {
        ...state,
        chapterID: section?.chapterID || "",
        lessonID: section?.lessonID || "",
        sectionID: section?.id || "",
      };
      const response = await addSentence(sentence).unwrap();

      if (clearOnSubmit === true) {
        setState(T_SENTENCE);
      }

      if (response) {
        toast.success("Sentence Added");
      } else {
        toast.warning("Error saving sentence");
      }
    } catch (e) {
      toast.error("Server Error");
    }
  };

  const handleClear = () => {
    setState(T_SENTENCE);
  };

  const [clearOnSubmit, setClearOnSubmit] = useState(false);

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

  // const sentenceTypes = [
  //   "Interrogative",
  //   "Informative",
  //   "Declarative",
  //   "Exclamatory",
  // ];
  const [page, setPage] = useState("Sentence");

  return (
    <FormContainer
      title="Add Sentence"
      submitButton="Add"
      onSubmit={handleSubmit}
      closeForm={setAdd}
      showClearOnSubmit={true}
      clearOnSubmit={clearOnSubmit}
      setClearOnSubmit={setClearOnSubmit}
      clearButton={true}
      handleClear={handleClear}
    >
      <MultiTabs className="flex flex-col gap-4">
        <TabNavigator
          pages={["Sentence", "BaseWord"]}
          page={page}
          setPage={setPage}
        ></TabNavigator>
        <TabContent currentPage={page} pageName="Sentence">
          {/* <InputField
            label="Sort Index"
            name="sortIndex"
            type="number"
            value={state?.sortIndex}
            handleChange={handleChange}
          /> */}
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
            autoFocus={true}
            lang="Russian"
          />
          <TextAreaField
            label="Translation"
            name="translation"
            value={state.translation}
            handleChange={handleChange}
          />
          {/* <InputField
            label="Pronunce"
            name="pronunce"
            type="text"
            value={state?.pronunce ?? ""}
            handleChange={handleChange}
          /> */}
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
          <InputField
            label="Type"
            name="type"
            type="text"
            value={state?.type ?? ""}
            handleChange={handleChange}
          />
        </TabContent>
      </MultiTabs>
    </FormContainer>
  );
}
