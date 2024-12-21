import { useState } from "react";
import {
  useEditDefinitionConentMutation,
  useRemoveDefinitionMutation,
} from "./definitionsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { DefinitionTemplate } from "../../data/templates";

export default function DefinitionEdit({ definition = {}, setEdit }) {
  const [editDefinitionContent, { isLoading }] =
    useEditDefinitionConentMutation();

  const [removeDefinition] = useRemoveDefinitionMutation();

  const [state, setState] = useState({ ...DefinitionTemplate, ...definition });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const canSave = !isLoading;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (canSave) {
      await editDefinitionContent(state);
      if (response?.data) {
        toast.success("Definition Saved");
        setEdit(false);
      } else {
        toast.error("Failed to save definition");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this item?")) {
      await removeDefinition(definition?.id);
      alert("Item Deleted");
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Definition"
      onSubmit={handleSubmit}
      deleteButton={true}
      onDelete={handleDelete}
      closeForm={setEdit}
    >
      <div className="field">
        <label htmlFor="sortindex" className="field__label">
          Sort Index
        </label>
        <input
          id="sortindex"
          name="sortindex"
          type="text"
          title="Sort Index"
          placeholder="Sort Index"
          value={state?.sortIndex}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="title" className="field__label">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          title="Title"
          placeholder="Title"
          value={state?.title}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="text" className="field__label">
          Text
        </label>
        <input
          id="text"
          name="text"
          type="text"
          title="Definition Text"
          placeholder="Definition Text"
          value={state?.text}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="caption" className="field__label">
          Caption
        </label>
        <input
          id="caption"
          name="caption"
          type="text"
          title="Caption"
          placeholder="Caption"
          value={state?.caption}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="note" className="field__label">
          Note
        </label>
        <input
          id="note"
          name="note"
          type="text"
          title="Note"
          placeholder="Note"
          value={state?.note}
          onChange={handleChange}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
