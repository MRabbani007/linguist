import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useEditWordMutation, useRemoveWordMutation } from "./wordsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { T_WORD } from "../../data/templates";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

type Props = {
  word: Word;
  attributes: WordAttribute[];
  setViewEdit: Dispatch<SetStateAction<boolean>>;
};

export default function FormWordEdit({
  word = T_WORD,
  attributes,
  setViewEdit,
}: Props) {
  const [editWord, { isLoading }] = useEditWordMutation();
  const [removeWord] = useRemoveWordMutation();

  const [page, setPage] = useState("content");
  const [state, setState] = useState({ ...T_WORD, ...word });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this word?")) {
        await removeWord(word?.id);
        toast.success("Word Deleted");
        setViewEdit(false);
      }
    } catch (err) {
      toast.error("Error deleting word");
    }
  };

  const canSave = !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (canSave) {
      try {
        let newWord = {
          ...word,
          ...state,
        };
        await editWord(newWord).unwrap();
        toast.success("Word Saved");
        setViewEdit(false);
      } catch (err) {
        toast.error("Server Error");
      }
    }
  };

  const wordType =
    attributes
      .find((item) => item.label === "Type")
      ?.values.map((item) => ({ label: item.label, value: item.label })) ?? [];
  const wordGender =
    attributes
      .find((item) => item.label === "Gender")
      ?.values.map((item) => ({ label: item.label, value: item.label })) ?? [];
  const wordLevel =
    attributes
      .find((item) => item.label === "Level")
      ?.values.map((item) => ({ label: item.label, value: item.label })) ?? [];
  const wordSubject =
    attributes
      .find((item) => item.label === "Subject")
      ?.values.map((item) => ({ label: item.label, value: item.label })) ?? [];

  useEffect(() => {
    setState({ ...word });
  }, [word]);

  return (
    <FormContainer
      type="edit"
      title="Edit Word"
      submitButton="Save Word"
      onSubmit={handleSubmit}
      closeForm={setViewEdit}
      deleteButton={true}
      onDelete={handleDelete}
    >
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPage("content")}
          className={
            (page === "content" ? "bg-zinc-200" : "") +
            " py-2 px-4 rounded-md duration-200"
          }
        >
          Content
        </button>
        <button
          type="button"
          onClick={() => setPage("headers")}
          className={
            (page === "headers" ? "bg-zinc-200" : "") +
            " py-2 px-4 rounded-md duration-200"
          }
        >
          Headers
        </button>
        <button
          type="button"
          onClick={() => setPage("image")}
          className={
            (page === "image" ? "bg-zinc-200" : "") +
            " py-2 px-4 rounded-md duration-200"
          }
        >
          Image
        </button>
      </div>
      <div
        className={
          (page === "content" ? "" : "hidden") +
          " flex flex-col gap-4 self-stretch items-stretch"
        }
      >
        <InputField
          label="Sort Index"
          name="sortIndex"
          type="number"
          value={state.sortIndex}
          handleChange={handleChange}
        />
        <InputField
          label="Base Word"
          name="first"
          type="text"
          value={state.first}
          handleChange={handleChange}
        />
        <InputField
          label="Base Word Caption"
          name="firstCaption"
          type="text"
          value={state.firstCaption}
          handleChange={handleChange}
        />
        <InputField
          label="Translation"
          name="second"
          type="text"
          value={state.second}
          handleChange={handleChange}
        />
        <InputField
          label="Translation Caption"
          name="secondCaption"
          type="text"
          value={state.secondCaption}
          handleChange={handleChange}
        />
        <InputField
          label="Pronounciation"
          name="third"
          type="text"
          value={state.third}
          handleChange={handleChange}
        />
        <InputField
          label="Other Meanings"
          name="fourth"
          type="text"
          value={state.fourth}
          handleChange={handleChange}
        />
      </div>
      <div
        className={
          (page === "headers" ? "" : "hidden") +
          " flex flex-col gap-4 self-stretch items-stretch"
        }
      >
        <SelectField
          options={wordType}
          label="Word Type"
          value={state.type ?? ""}
          onValueChange={(type) => setState((curr) => ({ ...curr, type }))}
        />
        <SelectField
          options={wordGender}
          label="Word Gender"
          value={state.gender ?? ""}
          onValueChange={(gender) => setState((curr) => ({ ...curr, gender }))}
        />
        <SelectField
          options={wordLevel}
          label="Word Level"
          value={state.level ?? ""}
          onValueChange={(level) => setState((curr) => ({ ...curr, level }))}
        />
        <SelectField
          options={wordSubject}
          label="Word Subject"
          value={state.subject ?? ""}
          onValueChange={(subject) =>
            setState((curr) => ({ ...curr, subject }))
          }
        />
        <InputField
          label="Word Form"
          name="form"
          type="text"
          value={state.form ?? ""}
          handleChange={handleChange}
        />
        <InputField
          label="Word Note"
          name="note"
          type="text"
          value={state.note ?? ""}
          handleChange={handleChange}
        />
        {/* Move to section */}
        {/* <div className="field">
        <label htmlFor="move-word" className="field__label">
          Move to Section:
        </label>
        <select
          name="move-word-section"
          id="move-word-section"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="field__input"
        >
          <option value="">Select Section</option>
          {sectionOptions}
        </select>
      </div> */}
      </div>
      <div
        className={
          (page === "image" ? "" : "hidden") +
          " flex flex-col gap-4 self-stretch items-stretch"
        }
      >
        <InputField
          label="Word Image"
          name="image"
          type="text"
          value={state.image ?? ""}
          handleChange={handleChange}
        />
        <InputField
          label="Word ImageURL"
          name="imageURL"
          type="text"
          value={state.imageURL ?? ""}
          handleChange={handleChange}
        />
      </div>
    </FormContainer>
  );
}
