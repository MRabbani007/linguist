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
import { useEditWordListMutation } from "../profile/profileSlice";
import { T_WORDLIST } from "@/data/templates";
import CheckboxField from "../ui/CheckboxField";

export default function FormEditWordList({
  wordList,
  setEdit,
}: {
  wordList: WordList;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editWordList] = useEditWordListMutation();

  const [state, setState] = useState({
    ...T_WORDLIST,
    ...wordList,
  });

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
      await editWordList(state).unwrap();

      toast.success("Word List Updated");
      setEdit(false);
    } catch (error) {
      toast.error("Error saving word list");
    }
  };

  return (
    <FormContainer
      title="Edit Word List"
      type="edit"
      onSubmit={onSubmit}
      closeForm={setEdit}
    >
      <InputField
        label="List Name"
        name="name"
        type="text"
        value={state?.name}
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
