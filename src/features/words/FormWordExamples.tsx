import FormContainer from "@/components/FormContainer";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useEditWordExamplesMutation } from "./wordsSlice";
import { T_WORD } from "@/data/templates";
import { toast } from "react-toastify";
import InputField from "../ui/InputField";
import { BiPlus } from "react-icons/bi";
import { CiTrash } from "react-icons/ci";

export default function FormWordExamples({
  word = T_WORD,
  setViewEdit,
}: {
  word: Word;
  setViewEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editWord, { isLoading }] = useEditWordExamplesMutation();
  const [state, setState] = useState({ ...T_WORD, ...word });

  const canSave = !isLoading;

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    idx: number,
    type: "sentence" | "translation"
  ) {
    const sentences = Array.isArray(state?.sentences)
      ? [...state.sentences]
      : [];
    const sentencesTranslation = Array.isArray(state.sentencesTranslation)
      ? [...state.sentencesTranslation]
      : [];

    const { value } = event.target;

    if (type === "sentence") {
      sentences.splice(idx, 1, value);
      setState((prev) => ({
        ...prev,
        sentences,
      }));
    } else if (type === "translation") {
      sentencesTranslation.splice(idx, 1, value);
      setState((prev) => ({
        ...prev,
        sentencesTranslation,
      }));
    }
  }

  function handleAddNewSentence(idx: number) {
    const sentences = Array.isArray(state?.sentences)
      ? [...state.sentences]
      : [];
    const sentencesTranslation = Array.isArray(state.sentencesTranslation)
      ? [...state.sentencesTranslation]
      : [];

    sentences.splice(idx, 0, "");
    sentencesTranslation.splice(idx, 0, "");
    setState((prev) => ({ ...prev, sentences, sentencesTranslation }));
  }

  function handleDeleteSentence(idx: number) {
    const sentences = Array.isArray(state?.sentences)
      ? [...state.sentences]
      : [];
    const sentencesTranslation = Array.isArray(state.sentencesTranslation)
      ? [...state.sentencesTranslation]
      : [];

    sentences.splice(idx, 1);
    sentencesTranslation.splice(idx, 1);
    setState((prev) => ({ ...prev, sentences, sentencesTranslation }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (canSave) {
      try {
        let newWord = {
          ...word,
          ...state,
        };
        await editWord(newWord);

        toast.success("Word Saved");
        setViewEdit(false);
      } catch (err) {
        toast.error("Server Error");
      }
    }
  }

  return (
    <FormContainer
      type="edit"
      title="Edit Word Examples"
      submitButton="Save"
      onSubmit={handleSubmit}
      closeForm={setViewEdit}
    >
      {state.sentences?.length === 0 ? (
        <>
          <button
            type="button"
            title="Add Sentence"
            className="py-1 px-2 w-fit bg-zinc-200 rounded-md hover:bg-zinc-300 duration-200"
            onClick={() => handleAddNewSentence(0)}
          >
            <BiPlus size={20} />
          </button>
        </>
      ) : (
        state?.sentences?.map((item, idx) => (
          <div className="flex flex-col gap-4 hover:ring-2 ring-red-400 rounded-md p-2 duration-200 relative group">
            <InputField
              label="Sentence"
              name={"sentence_" + idx}
              type="text"
              value={item}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, idx, "sentence")
              }
            />
            <InputField
              label="Translation"
              name={"translation_" + idx}
              type="text"
              value={
                state?.sentencesTranslation
                  ? state.sentencesTranslation[idx]
                  : ""
              }
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, idx, "translation")
              }
            />
            <div className="flex items-center gap-2 absolute bottom-1 right-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 duraiton-200">
              <button
                type="button"
                onClick={() => handleDeleteSentence(idx)}
                className="py-1 px-2 w-fit bg-zinc-200 rounded-md hover:bg-zinc-300 duration-200"
              >
                <CiTrash size={20} />
              </button>
              <button
                type="button"
                className="py-1 px-2 w-fit bg-zinc-200 rounded-md hover:bg-zinc-300 duration-200"
                onClick={() => handleAddNewSentence(idx + 1)}
              >
                <BiPlus size={20} />
              </button>
            </div>
          </div>
        ))
      )}
    </FormContainer>
  );
}
