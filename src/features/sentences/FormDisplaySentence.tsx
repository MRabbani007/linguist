import FormDisplayNav from "@/components/FormDisplayNav";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function FormDisplaySentence({
  sentences,
  title,
  initialIndex,
  showForm,
  setShowForm,
}: {
  sentences: Sentence[];
  title: string;
  initialIndex?: number;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [index, setIndex] = useState(initialIndex ?? 0);
  function handlePrev() {
    if (index > 0) {
      setIndex((curr) => curr - 1);
    }
  }
  function handleNext() {
    if (index < sentences?.length - 1) {
      setIndex((curr) => curr + 1);
    }
  }

  useEffect(() => {
    setIndex(initialIndex ?? 0);
  }, [showForm]);

  return (
    <FormDisplayNav
      title={title}
      handleNext={handleNext}
      handlePrev={handlePrev}
      index={index}
      setShowForm={setShowForm}
      showForm={showForm}
      total={sentences?.length}
    >
      <p className="flex-1 flex items-center justify-center text-xl font-medium text-black p-4 rounded-md bg-red-100">
        {sentences[index]?.text}
      </p>
      <p className="flex-1 flex items-center justify-center text-xl font-medium text-black p-4 rounded-md bg-green-100">
        {sentences[index]?.translation}
      </p>
    </FormDisplayNav>
  );
}
