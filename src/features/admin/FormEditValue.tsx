import {
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
import FormContainer from "../../components/FormContainer";
import SelectField from "../ui/SelectField";
import InputField from "../ui/InputField";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

export default function FormEditValue({
  setEdit,
  setModified,
  options,
  value,
}: {
  value: AttributeValue;
  setModified: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  options: { label: string; value: string }[];
}) {
  const token = useSelector(selectCurrentToken);

  const [state, setState] = useState({ ...T_VALUE, ...value });

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
      const response = await axiosPrivate.patch(
        "/admin/wordAttrValues",
        {
          attribute: state,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Value Updated");
        setModified(true);
        setEdit(false);
      } else {
        toast.error("Error updating value");
      }
    } catch (error) {
      toast.error("Error updating value");
    }
  }

  async function handleDelete() {
    if (confirm("Delete this value?")) {
      try {
        const response = await axiosPrivate.delete("/admin/wordAttrValues", {
          params: { id: state.id },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.status === 200) {
          toast.success("Value Deleted");
          setModified(true);
          setEdit(false);
        } else {
          toast.error("Error deleting value");
        }
      } catch (error) {
        toast.error("Error deleting value");
      }
    }
  }

  return (
    <FormContainer
      title="Update Attribute Value"
      type="edit"
      submitButton="Update Attribute Value"
      onSubmit={handleSubmit}
      closeForm={setEdit}
      deleteButton={true}
      onDelete={handleDelete}
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
