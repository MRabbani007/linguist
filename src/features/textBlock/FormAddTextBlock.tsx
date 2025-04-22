import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import FormContainer from "../../components/FormContainer";
import InputField from "../ui/InputField";
import { T_TEXTBLOCK } from "@/data/templates";
import { useAddTextBlockMutation } from "./textBlockSlice";
import { toast } from "react-toastify";
import SelectField from "../ui/SelectField";
import TextAreaField from "../ui/TextAreaField";

export default function FormAddTextBlock({
  lessonID,
  sectionID = "",
  scope,
  setAdd,
}: {
  lessonID: string;
  sectionID?: string;
  scope: string;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, setState] = useState({
    ...T_TEXTBLOCK,
    scope,
    sectionID,
    lessonID,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const [addTextBlock] = useAddTextBlockMutation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await addTextBlock(state).unwrap();
      toast.success("Text block Added");
    } catch (err) {
      toast.error("Failed to add text block");
    }
  };

  const typeOptions = [
    { label: "Introduction", value: "introduction" },
    { label: "Text", value: "text" },
    { label: "Conclusion", value: "conclusion" },
  ];

  return (
    <FormContainer
      title="Add Text Block"
      type="add"
      submitButton="Add"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <SelectField
        options={typeOptions}
        label="Text Type"
        value={state.type ?? ""}
        onValueChange={(type) => setState((curr) => ({ ...curr, type }))}
      />
      <InputField
        label="Sort Index"
        name="sortIndex"
        type="number"
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
        label="Label"
        name="label"
        type="text"
        value={state.label}
        handleChange={handleChange}
      />
      <TextAreaField
        label="Text"
        name="text"
        value={state.text}
        handleChange={handleChange}
      />
      <InputField
        label="Caption"
        name="caption"
        type="text"
        value={state.caption}
        handleChange={handleChange}
      />
      <InputField
        label="Information"
        name="information"
        type="text"
        value={state.information}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
