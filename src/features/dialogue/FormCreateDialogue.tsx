import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import FormContainer from "../components/FormContainer";
import { axiosPrivate } from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const template: Dialogue = {
  id: "",
  sortIndex: 0,
  title: "",
  subtitle: "",
  notes: "",
  subject: "",
  level: "",
  people: ["1", "2"],
};

const SUBJECT = {
  Animals: "",
  Food: "",
  TimeDate: "",
  DaysMonths: "",
  Weather: "",
  Health: "",
  Numbers: "",
  People: "",
  Professions: "",
  Communication: "",
  Sports: "",
  Home: "",
  Vehicles: "",
};

const LEVEL = {
  1: "A1",
  2: "A2",
  3: "B1",
  4: "B2",
  5: "C1",
  6: "C2",
};

interface Props {
  type: "add" | "edit";
  dialogue?: Dialogue;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function FormCreateDialogue({
  type,
  dialogue,
  setShowForm,
}: Props) {
  const navigate = useNavigate();

  const [state, setState] = useState<Dialogue>(() =>
    dialogue?.id ? dialogue : template
  );
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const createDialogue = async (event: FormEvent) => {
    event.preventDefault();
    if (dialogue?.id) {
      const response = await axiosPrivate.patch("/dialogue", {
        dialogue: state,
      });
      if (response?.status === 204) {
        toast.success("Dialogue Updated");
        setShowForm(false);
      } else {
        toast.error("Error");
      }
    } else {
      const response = await axiosPrivate.post("/dialogue", {
        dialogue: { ...state, id: crypto.randomUUID() },
      });
      if (response?.status === 204) {
        toast.success("Dialogue Added");
      } else {
        toast.error("Error");
      }
    }
  };

  const onDelete = async () => {
    if (confirm("Delete this dialogue?")) {
      const response = await axiosPrivate.delete("/dialogue", {
        data: { id: dialogue?.id },
      });
      if (response?.status === 204) {
        toast.success("Dialogue Added");
        navigate("/content/dialogue");
        setShowForm(false);
      } else {
        toast.error("Error");
      }
    }
  };

  return (
    <FormContainer
      onSubmit={createDialogue}
      closeForm={setShowForm}
      type={type}
      deleteButton={type === "edit"}
      onDelete={onDelete}
      title={type === "add" ? "Create Dialogue" : "Edit Dialogue"}
    >
      {/* Sort Index */}
      <div className="field__row">
        <label htmlFor="sortIndex" className="field__label">
          Sort Index
        </label>
        <input
          type="text"
          id="sortIndex"
          name="sortIndex"
          placeholder="Sort Index"
          value={state?.sortIndex}
          onChange={handleChange}
          className="field__input__row"
        />
      </div>
      {/* Title */}
      <div className="field__row">
        <label htmlFor="title" className="field__label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={state?.title}
          onChange={handleChange}
          className="field__input__row"
        />
      </div>
      {/* Sub Title */}
      <div className="field__row">
        <label htmlFor="subtitle" className="field__label">
          Sub Title
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          placeholder="Sub Title"
          value={state?.subtitle}
          onChange={handleChange}
          className="field__input__row"
        />
      </div>
      {/* Level */}
      <div className="field__row">
        <span className="field__label">Level</span>
        <select
          name="level"
          id="level"
          value={state?.level}
          onChange={handleChange}
          className="field__input__row"
        >
          <option value="">Select Level</option>
          {Object.keys(LEVEL).map((item, index) => {
            return (
              <option key={index} value={item}>
                {LEVEL[+item as keyof typeof LEVEL]}
              </option>
            );
          })}
        </select>
      </div>
      {/* Subject */}
      <div className="field__row">
        <span className="field__label">Subject</span>
        <select
          name="subject"
          id="subject"
          value={state?.subject}
          onChange={handleChange}
          className="field__input__row"
        >
          <option value="">Select Subject</option>
          {Object.keys(SUBJECT).map((item, index) => {
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
