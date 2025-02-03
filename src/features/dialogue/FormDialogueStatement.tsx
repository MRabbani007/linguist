import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { axiosPrivate } from "../../api/axios";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";

const template: DialogueStatement = {
  id: "",
  dialogueID: "",
  sortIndex: 0,
  text: "",
  translation: "",
  person: "",
};

interface Props {
  type: "add" | "edit";
  statement?: DialogueStatement | null;
  dialogue?: Dialogue;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function FormDialogueStatement({
  type,
  statement,
  dialogue,
  setShowForm,
}: Props) {
  const [state, setState] = useState<DialogueStatement>(() => {
    if (statement?.id) {
      return statement;
    } else {
      return { ...template, dialogueID: dialogue?.id ?? "" };
    }
  });
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (statement?.id) {
      const response = await axiosPrivate.patch("/dialogue/statement", {
        statement: state,
      });
      if (response?.status === 204) {
        toast.success("Statement Updated");
        setShowForm(false);
      } else {
        toast.error("Error");
      }
      setShowForm(false);
    } else {
      const response = await axiosPrivate.post("/dialogue/statement", {
        statement: { ...state, id: crypto.randomUUID() },
      });
      if (response?.status === 204) {
        toast.success("Statement Added");
        setState((curr) => {
          return { ...curr, sortIndex: +curr.sortIndex + 1 };
        });
      } else {
        toast.error("Error");
      }
    }
  };

  const onDelete = async () => {
    if (confirm("Delete this statement?")) {
      const response = await axiosPrivate.delete("/dialogue/statement", {
        data: { id: statement?.id },
      });
      if (response.status === 204) {
        toast.success("Statement deleted");
        setShowForm(false);
      } else {
        toast.error("Error");
      }
    }
  };

  return (
    <FormContainer
      onSubmit={onSubmit}
      closeForm={setShowForm}
      type={type}
      deleteButton={type === "edit"}
      onDelete={onDelete}
      title={type === "add" ? "Add Statement" : "Edit Statement"}
    >
      {/* Sort Index */}
      <div className="field__row">
        <label htmlFor="sortIndex" className="field__label">
          Sort Index
        </label>
        <input
          type="number"
          min={0}
          step={1}
          id="sortIndex"
          name="sortIndex"
          placeholder="Sort Index"
          value={state?.sortIndex}
          onChange={handleChange}
          className="field__input__row"
        />
      </div>
      {/* Text */}
      <div className="field__row">
        <label htmlFor="text" className="field__label">
          Text
        </label>
        <input
          type="text"
          id="text"
          name="text"
          placeholder="text"
          value={state?.text}
          onChange={handleChange}
          className="field__input__row"
        />
      </div>
      {/* Translation */}
      <div className="field__row">
        <label htmlFor="translation" className="field__label">
          Translation
        </label>
        <input
          type="translation"
          id="translation"
          name="translation"
          placeholder="Translation"
          value={state?.translation}
          onChange={handleChange}
          className="field__input__row"
        />
      </div>
      {/* Person */}
      <div className="field__row">
        <span className="field__label">Person</span>
        <select
          name="person"
          id="person"
          value={state?.person}
          onChange={handleChange}
          className="field__input__row"
        >
          <option value="">Select Person</option>
          {dialogue?.people &&
            dialogue?.people.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>
    </FormContainer>
  );
}
