import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import FormContainer from "../../components/FormContainer";
import InputField from "../ui/InputField";
import { toast } from "react-toastify";
import { useCreateWordListMutation } from "../profile/profileSlice";
import CheckboxField from "../ui/CheckboxField";
import { T_WORDLIST } from "@/data/templates";

export default function FormCreateWordList({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [createList] = useCreateWordListMutation();

  const [state, setState] = useState(T_WORDLIST);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await createList({ id: "", name }).unwrap();

      if (response?.status === 200) {
        toast.success("Word List Created");
        setAdd(false);
      } else {
        toast.error("Error creating word list");
      }
    } catch (error) {
      toast.error("Error creating word list");
    }
  };

  return (
    <FormContainer
      title="Create Word List"
      type="add"
      onSubmit={onSubmit}
      closeForm={setAdd}
    >
      <InputField
        label="List Name"
        name="name"
        type="text"
        value={state.name}
        handleChange={handleChange}
      />
      <CheckboxField
        label="isVisible"
        name="visible"
        value={state?.visible}
        onChange={(val: boolean) =>
          setState((curr) => ({
            ...curr,
            visible: val,
          }))
        }
      />
      <CheckboxField
        label="isShared"
        name="shared"
        value={state?.shared}
        onChange={(val: boolean) =>
          setState((curr) => ({
            ...curr,
            shared: val,
          }))
        }
      />
    </FormContainer>
  );
}
