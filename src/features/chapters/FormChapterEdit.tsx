import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  useEditChapterMutation,
  useRemoveChapterMutation,
} from "./chapterSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import { T_CHAPTER } from "../../data/templates";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

export default function FormChapterEdit({
  chapter,
  setEdit,
}: {
  chapter: Chapter;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editChapter, { isLoading }] = useEditChapterMutation();
  const [removeChapter] = useRemoveChapterMutation();

  const [state, setState] = useState({ ...T_CHAPTER, ...chapter });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        await editChapter(state).unwrap();
        toast.success("Chapter saved");
        setEdit(false);
      } catch (err) {
        toast.error("Failed to save the chapter");
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this Chapter?")) {
        await removeChapter(chapter.id).unwrap();
        toast.success("Chapter Deleted");
        setEdit(false);
      }
    } catch (err) {
      toast.error("Error deleting chapter");
    }
  };

  return (
    <FormContainer
      title="Edit Chapter"
      type="edit"
      submitButton="Save Chapter"
      deleteButton={true}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <InputField
        label="Chapter Number"
        name="chapterNo"
        type="number"
        value={state?.chapterNo ?? 0}
        handleChange={handleChange}
      />
      <InputField
        label="Sort Index"
        name="sortIndex"
        type="number"
        value={state?.sortIndex ?? 0}
        handleChange={handleChange}
      />
      <InputField
        label="Chapter Title"
        name="title"
        type="text"
        value={state.title}
        handleChange={handleChange}
      />
      <InputField
        label="Chapter Subtitle"
        name="subtitle"
        type="text"
        value={state.subtitle}
        handleChange={handleChange}
      />
      <InputField
        label="Chapter Detail"
        name="detail"
        type="text"
        value={state.detail}
        handleChange={handleChange}
      />
      <InputField
        label="Level"
        name="level"
        type="text"
        value={state?.level ?? ""}
        handleChange={handleChange}
      />
      <InputField
        label="Learning Time"
        name="learningTime"
        type="number"
        value={state?.learningTime ?? 0}
        handleChange={handleChange}
      />
      <SelectField
        label="Status"
        value={state?.status ?? ""}
        options={[
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" },
          { label: "Archived", value: "archived" },
        ]}
        onValueChange={(status) => setState((curr) => ({ ...curr, status }))}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="visible"
          id="visible"
          checked={state?.visible ?? true}
          onChange={() =>
            setState((curr) => ({ ...curr, visible: !curr.visible }))
          }
        />
        <label htmlFor="visible">Visible</label>
      </div>
    </FormContainer>
  );
}
