import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  useEditSectionHeaderMutation,
  useRemoveSectionMutation,
} from "./sectionSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import SelectField from "../ui/SelectField";
import InputField from "../ui/InputField";

interface Props {
  section: Section;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

const wordDisplayOptions = [
  { label: "Table", value: "table" },
  { label: "Grid", value: "grid" },
];

export default function FormSectionEdit({ section, setEdit }: Props) {
  const [editSectionHeader, { isLoading }] = useEditSectionHeaderMutation();
  const [removeSection] = useRemoveSectionMutation();

  const [state, setState] = useState(section);

  const canSave = !isLoading;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      await editSectionHeader(state);
      toast.success("Section Saved");
      setEdit(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this section?")) {
      await removeSection(section?.id);
      toast.success("Section Deleted");
      setEdit(false);
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Section Title"
      submitButton="Save Section"
      deleteButton={true}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      closeForm={setEdit}
    >
      <InputField
        label="Index"
        name="sortIndex"
        type="text"
        value={state?.sortIndex ? state?.sortIndex : 0}
        handleChange={handleChange}
      />
      <InputField
        label="Title"
        name="title"
        type="text"
        value={state?.title ?? ""}
        handleChange={handleChange}
      />
      <InputField
        label="Subtitle"
        name="subtitle"
        type="text"
        value={state?.subtitle ?? ""}
        handleChange={handleChange}
      />
      <SelectField
        options={wordDisplayOptions}
        label="Word Display"
        value={state.display ?? ""}
        onValueChange={(display) =>
          setState((curr) => ({
            ...curr,
            display,
          }))
        }
      />
    </FormContainer>
  );
}
