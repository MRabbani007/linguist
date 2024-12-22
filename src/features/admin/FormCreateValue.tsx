import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { T_VALUE } from "../../data/templates";
import { createSlug } from "../../lib/utils";
import { axiosPrivate } from "../../api/axios";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

export default function FormCreateValue({
  setAdd,
  setModified,
  options,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
  setModified: Dispatch<SetStateAction<boolean>>;
  options: { label: string; value: string }[];
}) {
  const [state, setState] = useState(T_VALUE);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  useEffect(() => {
    setState((curr) => ({ ...curr, slug: createSlug(state.label) }));
  }, [state.label]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axiosPrivate.post("/admin/wordAttrValues", {
        attribute: state,
      });

      if (response.status === 200) {
        toast.success("Value Added");
        setModified(true);
      } else {
        toast.error("Error creating value");
      }
    } catch (error) {
      toast.error("Error creating value");
    }
  }

  return (
    <FormContainer
      title="Add Attribute Value"
      type="add"
      submitButton="Add Attribute Value"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <SelectField
        options={options}
        label="Attribute"
        value={state.attrID}
        onValueChange={(attrID) => setState((curr) => ({ ...curr, attrID }))}
      />
      <InputField
        label="Value Label"
        name="label"
        type="text"
        value={state.label}
        handleChange={handleChange}
      />
      <InputField
        label="Value Abbreviation"
        name="abbrev"
        type="text"
        value={state.abbrev}
        handleChange={handleChange}
      />
      <InputField
        label="Value Short Hand"
        name="shortHand"
        type="text"
        value={state.shortHand}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
