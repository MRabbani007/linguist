import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  useEditDefinitionMutation,
  useRemoveDefinitionMutation,
} from "./definitionsSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import { T_DEFINITION } from "../../data/templates";
import InputField from "../ui/InputField";

export default function FormDefinitionEdit({
  definition,
  setEdit,
}: {
  definition: Definition;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editDefinition, { isLoading }] = useEditDefinitionMutation();

  const [removeDefinition] = useRemoveDefinitionMutation();

  const [state, setState] = useState({ ...T_DEFINITION, ...definition });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const canSave = !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (canSave) {
      await editDefinition(state);
      // if (response?.status === 200) {
      toast.success("Definition Saved");
      // setEdit(false);
      // } else {
      // toast.error("Failed to save definition");
      // }
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this item?")) {
      await removeDefinition(definition?.id);
      alert("Item Deleted");
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Definition"
      onSubmit={handleSubmit}
      deleteButton={true}
      onDelete={handleDelete}
      closeForm={setEdit}
    >
      <InputField
        label="Sort Index"
        name="sortIndex"
        type="text"
        value={state.sortIndex}
        handleChange={handleChange}
      />
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
