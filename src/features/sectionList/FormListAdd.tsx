import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useAddSectionListMutation } from "./sectionListSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import { T_SECTIONLIST } from "../../data/templates";

export default function ListAdd({
  lessonID = "",
  sectionID = "",
  setAdd,
}: {
  lessonID: string;
  sectionID: string;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [addSectionList, { isLoading }] = useAddSectionListMutation();

  const [state, setState] = useState<SectionList>(T_SECTIONLIST);

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

    const sectionList = {
      ...state,
      lessonID,
      sectionID,
      id: crypto.randomUUID(),
    };

    if (canSave) {
      await addSectionList(sectionList);
      toast.success("List Added");
      setAdd(false);
    }
  };

  return (
    <FormContainer
      type="add"
      title="Add List"
      submitButton="Add List"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      {/* type */}
      <div className="field_group">
        <input
          name="type"
          id="type_OL"
          type="radio"
          title="Ordered List"
          value={"OL"}
          checked={state?.type === "OL"}
          onChange={handleChange}
        />
        <label htmlFor="type_OL">Ordered List</label>
        <input
          name="type"
          id="type_UL"
          type="radio"
          title="Un-Ordered List"
          value={"UL"}
          checked={state?.type === "UL"}
          onChange={handleChange}
        />
        <label htmlFor="list_type_UL">Un-Ordered List</label>
      </div>
      {/* Sort Index */}
      <div className="field">
        <label htmlFor="sortIndex" className="field__label">
          Number
        </label>
        <input
          id="sortIndex"
          name="sortIndex"
          type="text"
          title="sortIndex"
          placeholder="sortIndex"
          value={state?.sortIndex}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      {/* Title */}
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
      {/* Text */}
      <div className="field">
        <label htmlFor="text" className="field__label">
          Text
        </label>
        <input
          id="text"
          type="text"
          title="List Text"
          placeholder="List Text"
          value={state?.text}
          onChange={handleChange}
          className="field__input"
        />
      </div>
      {/* Notes */}
      <div className="field">
        <label htmlFor="notes" className="field__label">
          Notes
        </label>
        <input
          id="notes"
          name="notes"
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
