import { useState } from "react";
import { useAddDefinitionMutation } from "./definitionsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { DefinitionTemplate } from "../../data/templates";

export default function DefinitionAdd({ lessonID, sectionID = "", setAdd }) {
  const [addDefinition, { isLoading }] = useAddDefinitionMutation();

  const [state, setState] = useState(DefinitionTemplate);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const definition = {
      id: crypto.randomUUID(),
      lessonID,
      sectionID,
      ...state,
    };

    if (canSave) {
      const response = await addDefinition(definition);
      if (response?.data) {
        toast.success("Definition Created");
        setAdd(false);
      } else {
        toast.error("Failed to create definition");
      }
    }
  };

  return (
    <FormContainer
      title="Add Definition"
      type="add"
      submitButton="Add Definition"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <div className="field">
        <label htmlFor="title" className="field__label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
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
          title="Def. Text"
          placeholder="Def. Text"
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
          placeholder="Caption"
          value={state?.caption}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      <div className="field w-full">
        <label htmlFor="note" className="field__label">
          Note
        </label>
        <input
          id="note"
          name="note"
          type="text"
          title="Note"
          placeholder="Note"
          value={state?.notes}
          onChange={handleChange}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
