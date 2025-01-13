import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import FormEditTextBlock from "./FormEditTextBlock";

export default function CardTextBlock({ textBlock }: { textBlock: TextBlock }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div className="relative group bg-zinc-100">
        <p className="text-balance group relative">{textBlock.title}</p>
        <p>
          <span>{textBlock?.label}</span>
          <span>{textBlock?.text}</span>
        </p>
        <button
          onClick={() => setEdit(true)}
          className="absolute top-1 right-1 invisible group-hover:visible"
        >
          <CiEdit size={20} />
        </button>
      </div>
      {edit && <FormEditTextBlock textBlock={textBlock} setEdit={setEdit} />}
    </>
  );
}
