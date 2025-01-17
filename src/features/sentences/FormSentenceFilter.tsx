import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../components/FormContainer";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import SelectField from "../ui/SelectField";
import { useSelector } from "react-redux";
import { selectLessons } from "../globals/globalsSlice";

export default function FormSentenceFilter({
  setShowForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [level, setLevel] = useState("all");
  const [lessonID, setLessonID] = useState("");

  const lessons = useSelector(selectLessons);
  const lessonOptions = lessons.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate({
      pathname: location.pathname,
      search: `${createSearchParams({ level, lessonID })}`,
    });
    setShowForm(false);
  };

  const levelOptions = new Array(10).fill("").map((_, idx) => ({
    label: (idx + 1).toString(),
    value: (idx + 1).toString(),
  }));

  return (
    <FormContainer
      title="Filter Sentences"
      closeForm={setShowForm}
      onSubmit={onSubmit}
    >
      <SelectField
        options={levelOptions}
        label="Level"
        value={level ?? ""}
        onValueChange={(level) => setLevel(level)}
      />
      <SelectField
        label="Lesson"
        value={lessonID ?? ""}
        options={lessonOptions}
        onValueChange={(lessonID) => setLessonID(lessonID)}
      />
    </FormContainer>
  );
}
