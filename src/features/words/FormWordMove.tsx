import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FormContainer from "../../components/FormContainer";
import SelectField from "../ui/SelectField";
import { T_WORD } from "@/data/templates";
import { useEditWordMutation } from "./wordsSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectLessons } from "../globals/globalsSlice";
import { useLazyGetAllSectionsQuery } from "../admin/adminApiSlice";
import { useSearchParams } from "react-router-dom";

export default function FormWordMove({
  word,
  setEdit,
}: {
  word: Word;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchParams] = useSearchParams();

  const lessonID = searchParams.get("id") ?? "";

  const [editWord] = useEditWordMutation();
  const [getAllSections, { data: sections, isSuccess: isSuccessSections }] =
    useLazyGetAllSectionsQuery();

  useEffect(() => {
    getAllSections(1);
  }, []);

  const [state, setState] = useState<Word>({ ...T_WORD, ...word, lessonID });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await editWord(state);
      toast.success("Word Updated");
      setEdit(false);
    } catch (err) {
      toast.error("Error");
    }
  };

  const lessons = useSelector(selectLessons);
  const lessonOptions = lessons.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const sectionOptions =
    isSuccessSections && Array.isArray(sections?.data)
      ? sections?.data
          .filter((item) => item.lessonID === state?.lessonID)
          .map((item) => ({
            label: item.title,
            value: item.id,
          }))
      : [];

  return (
    <FormContainer
      type="edit"
      title="Move Word"
      submitButton="Save"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <SelectField
        label="Lesson"
        options={lessonOptions}
        value={state?.blockID}
        onValueChange={(lessonID) =>
          setState((curr) => ({ ...curr, lessonID }))
        }
      />
      <SelectField
        label="Section"
        options={sectionOptions}
        value={state?.sectionID}
        onValueChange={(sectionID) =>
          setState((curr) => ({ ...curr, sectionID }))
        }
      />
    </FormContainer>
  );
}
