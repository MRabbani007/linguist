import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FormContainer from "../components/FormContainer";
import { T_ATTRIBUTE } from "@/data/templates";
import { createSlug } from "@/lib/utils";
import { axiosPrivate } from "@/api/axios";
import { toast } from "react-toastify";
import InputField from "../ui/InputField";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

export default function FormEditAttribute({
  attribute,
  setEdit,
  setModified,
}: {
  attribute: WordAttribute;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setModified: Dispatch<SetStateAction<boolean>>;
}) {
  const token = useSelector(selectCurrentToken);

  const [state, setState] = useState({ ...T_ATTRIBUTE, ...attribute });

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
        "/admin/wordAttributes",
        {
          attribute: state,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setModified(true);
        toast.success("Attribute updated");
      } else {
        toast.error("Error updating attribute");
      }
    } catch (error) {
      toast.error("Error updating attribute");
    }
  }

  async function handleDelete() {
    if (confirm("Delete this attribute?")) {
      try {
        const response = await axiosPrivate.delete("/admin/wordAttributes", {
          params: { id: state.id },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.status === 200) {
          toast.success("Attribute Deleted");
          setModified(true);
          setEdit(false);
        } else {
          toast.error("Error deleting attribute");
        }
      } catch (error) {
        toast.error("Error deleting attribute");
      }
    }
  }

  return (
    <FormContainer
      title="Edit Word Attribute"
      type="edit"
      submitButton="Edit Attribute"
      onSubmit={handleSubmit}
      closeForm={setEdit}
      deleteButton={true}
      onDelete={handleDelete}
    >
      <InputField
        label="Attribute Label"
        name="label"
        type="text"
        value={state.label}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
