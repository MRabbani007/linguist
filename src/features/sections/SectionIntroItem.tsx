import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import FormSectionIntroEdit from "./FormSectionIntroEdit";

export default function SectionIntroItem({
  introItem,
  sectionID,
  index,
}: {
  sectionID: string;
  introItem: string;
  index: number;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <p className="text-balance group relative bg-green-200">
        {introItem}
        <button onClick={() => setEdit(true)}>
          <CiEdit size={20} />
        </button>
      </p>
      {edit && (
        <FormSectionIntroEdit
          index={index}
          introItem={introItem}
          sectionID={sectionID}
          setEdit={setEdit}
        />
      )}
    </>
  );
}
