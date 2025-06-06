import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useAddListWordMutation } from "../profile/profileSlice";
import SelectField from "../ui/SelectField";
import { toast } from "react-toastify";

export default function FormAddtoList({
  words,
  wordLists: data,
  setAdd,
}: {
  words: Partial<Word>[];
  wordLists: WordList[];
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [listID, setListID] = useState("");

  const [addListWord] = useAddListWordMutation();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await addListWord({
        words,
        listID,
      });

      console.log(response);

      toast.success("Word added");

      setAdd(false);
    } catch (error) {}
  };

  const options = Array.isArray(data)
    ? data.map((item) => ({ label: item.name, value: item.id }))
    : [];

  return (
    <FormContainer title="Add to List" onSubmit={onSubmit} closeForm={setAdd}>
      <SelectField
        label="Word List"
        onValueChange={(listID) => setListID(listID)}
        options={options}
        value={listID}
      />
    </FormContainer>
  );
}
