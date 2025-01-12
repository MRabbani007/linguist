import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import FormContainer from "../components/FormContainer";
import InputField from "../ui/InputField";
import { toast } from "react-toastify";
import { useCreateWordListMutation } from "../profile/profileSlice";

export default function FormCreateWordList({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [createList] = useCreateWordListMutation();

  const [name, setName] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await createList({ id: "", name });

      toast.success("Word List Created");
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
        value={name}
        handleChange={(event: ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
      />
    </FormContainer>
  );
}
