import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../components/FormContainer";
import {
  useAddListWordMutation,
  useGetWordListsQuery,
} from "../profile/profileSlice";
import SelectField from "../ui/SelectField";
import { toast } from "react-toastify";

export default function FormAddtoList({
  word,
  setAdd,
}: {
  word: Word;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [listID, setListID] = useState("");

  const [addListWord] = useAddListWordMutation();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await addListWord({
        wordID: word.id,
        listID,
        repeatCount: 5,
        lastViewed: new Date(),
      });

      toast.success("Word added");

      setAdd(false);
    } catch (error) {}
  };

  const { data } = useGetWordListsQuery(null);

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
