import { useState } from "react";
import {
  useDeleteWordSentenceMutation,
  useEditWordSentenceMutation,
} from "./wordsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

const CardEditSentence = ({ word, index, setEdit }) => {
  const [editWordSentence] = useEditWordSentenceMutation();
  const [deleteWordSentece] = useDeleteWordSentenceMutation();

  const [newSentence, setNewSentence] = useState(word?.sentences[index] ?? "");
  const [newTranslation, setNewTranslation] = useState(
    word?.sentencesTranslation[index] || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editWordSentence({
      id: word.id,
      sentence: newSentence,
      translation: newTranslation,
      index,
    });
    toast.success("Sentence Saved");
    setEdit(false);
  };

  const handleDelete = async () => {
    if (confirm("Delete this Sentence?")) {
      await deleteWordSentece({ id: word.id, index });
      toast.success("Sentence Deleted");
      setEdit(false);
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Sentence"
      deleteButton={true}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field w-full">
        <label htmlFor="edit_sentence" className="field__label">
          Sentence
        </label>
        <input
          id="edit_sentence"
          name="edit_sentence"
          title="Sentence"
          placeholder="Sentence"
          autoFocus
          value={newSentence}
          onChange={(e) => setNewSentence(e.target.value)}
          className="field__input"
        />
      </div>
      <div className="field w-full">
        <label htmlFor="translationInput" className="field__label">
          Enter translation
        </label>
        <input
          type="text"
          id="translationInput"
          name="translationInput"
          placeholder="Enter translation"
          className="field__input"
          value={newTranslation}
          onChange={(e) => {
            setNewTranslation(e.target.value);
          }}
        />
      </div>
    </FormContainer>
  );
};

export default CardEditSentence;
