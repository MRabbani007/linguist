import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { T_DEFINITION } from "../../data/templates";
import InputField from "../ui/InputField";
import { useCreateDefinitionMutation } from "./definitionsSlice";

export default function FormDefinitionAdd({
  lessonID,
  sectionID,
  setAdd,
}: {
  lessonID?: string;
  sectionID?: string;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [createDefinition, { isLoading }] = useCreateDefinitionMutation();

  const [state, setState] = useState({
    ...T_DEFINITION,
    lessionID: lessonID ?? "",
    sectionID: sectionID ?? "",
  });

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
      await createDefinition({
        ...state,
        id: crypto.randomUUID(),
        lessonID,
        sectionID,
      });
      // if (response?.data) {
      toast.success("Definition Created");
      //   setAdd(false);
      // } else {
      //   toast.error("Failed to create definition");
      // }
    }
  };

  return (
    <FormContainer
      title="Add Definition"
      type="add"
      submitButton="Add Definition"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <InputField
        label="Title"
        name="title"
        type="text"
        value={state.title}
        handleChange={handleChange}
      />
      <InputField
        label="Text"
        name="text"
        type="text"
        value={state.text}
        handleChange={handleChange}
      />
      <InputField
        label="Caption"
        name="text"
        type="text"
        value={state.caption}
        handleChange={handleChange}
      />
      <InputField
        label="Notes"
        name="notes"
        type="text"
        value={state.notes}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
