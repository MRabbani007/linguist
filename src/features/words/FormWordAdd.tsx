import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useAddWordMutation } from "./wordsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import useLocalStorage from "../../hooks/useLocalStorage";
import { T_WORD } from "../../data/templates";
import InputField from "../ui/InputField";

// TODO : add select lesson / section
export default function FormWordAdd({
  sectionID = "",
  lessonID = "",
  setAdd,
}: {
  lessonID?: string;
  sectionID?: string;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [value, setValue] = useLocalStorage("WordAdd", T_WORD);

  const [addWord, { isLoading }] = useAddWordMutation();
  const [clearOnSubmit, setClearOnSubmit] = useState(false);

  const [state, setState] = useState<Word>(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const canSave = !isLoading; //[firstInput, secondInput, thirdInput, fourthInput].every(Boolean) &&

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setValue(state);
    if (canSave) {
      try {
        await addWord({
          ...state,
          id: crypto.randomUUID(),
          lessonID,
          sectionID,
        });
        toast.success("Word Added");
        if (clearOnSubmit) {
          setState(value);
        }
      } catch (err) {
        toast.error("Error");
      }
    } else {
      toast.info("Provide Required Values");
    }
  };

  const handleClear = () => {
    setState(value);
  };

  return (
    <FormContainer
      type="add"
      title="Add Word"
      submitButton="Add Word"
      clearButton={true}
      onSubmit={handleSubmit}
      closeForm={setAdd}
      handleClear={handleClear}
      clearOnSubmit={clearOnSubmit}
      setClearOnSubmit={setClearOnSubmit}
    >
      <InputField
        label="Sort Index"
        name="sortIndex"
        type="number"
        value={state.sortIndex}
        handleChange={handleChange}
      />
      <InputField
        label="Base Word"
        name="first"
        type="text"
        value={state.first}
        handleChange={handleChange}
      />
      <InputField
        label="Base Word Caption"
        name="firstCaption"
        type="text"
        value={state.firstCaption}
        handleChange={handleChange}
      />
      <InputField
        label="Translation"
        name="second"
        type="text"
        value={state.second}
        handleChange={handleChange}
      />
      <InputField
        label="Translation Caption"
        name="secondCaption"
        type="text"
        value={state.secondCaption}
        handleChange={handleChange}
      />
      <InputField
        label="Pronounciation"
        name="third"
        type="text"
        value={state.third}
        handleChange={handleChange}
      />
      <InputField
        label="Other Meanings"
        name="fourth"
        type="text"
        value={state.fourth}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
