import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FormContainer from "../components/FormContainer";
import InputField from "../ui/InputField";
import { T_ATTRIBUTE } from "../../data/templates";
import { createSlug } from "../../lib/utils";
import { axiosPrivate } from "../../api/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

export default function FormCreateAttribute({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const token = useSelector(selectCurrentToken);

  const [state, setState] = useState(T_ATTRIBUTE);

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
      const response = await axiosPrivate.post(
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
        toast.success("Attribute Created");
      } else {
        toast.error("Error creating attribute");
      }
    } catch (error) {
      toast.error("Error creating attribute");
    }
  }

  return (
    <FormContainer
      title="Add Word Attribute"
      type="add"
      submitButton="Add Attribute"
      onSubmit={handleSubmit}
      closeForm={setAdd}
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
