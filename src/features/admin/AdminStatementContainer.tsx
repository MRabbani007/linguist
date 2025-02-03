import { Dispatch, ReactNode, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";

export default function AdminStatementContainer({
  children,
  statement,
  setEdit,
  setEditItem,
}: {
  children: ReactNode;
  statement: DialogueStatement;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<DialogueStatement | null>>;
}) {
  return (
    <div className="relative">
      {children}
      <button
        className="absolute top-2 right-2"
        onClick={() => {
          setEdit(true);
          setEditItem(statement);
        }}
      >
        <CiEdit size={24} />
      </button>
    </div>
  );
}
