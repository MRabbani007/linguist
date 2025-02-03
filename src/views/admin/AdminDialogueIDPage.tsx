import AdminStatementContainer from "@/features/admin/AdminStatementContainer";
import CardStatement from "@/features/dialogue/CardStatement";
import FormDialogueStatement from "@/features/dialogue/FormDialogueStatement";
import { useLazyGetAdminDialogueByIDQuery } from "@/features/dialogue/dialogueSlice";
import { useEffect, useState } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

export default function AdminDialogueIDPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [getDialogue, { data }] = useLazyGetAdminDialogueByIDQuery();

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<DialogueStatement | null>(null);

  useEffect(() => {
    if (id) {
      getDialogue(id);
    }
  }, [id]);

  if (!data) return null;

  const { dialogue, statements } = data;

  return (
    <>
      <header className="flex items-center gap-4  mb-4 ">
        <p className="rounded-lg p-2 bg-red-600">
          <LuMessagesSquare className="text-white size-6 md:size-8" />
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold border-b-2 pb-1 border-red-700 flex-1">
          Dialogues
        </h1>
      </header>
      <div className="flex">
        <p className="text-xl py-3 px-4 bg-red-600 text-white rounded-md">
          {dialogue.sortIndex}
        </p>
        <div className="flex-1">
          <h2 className="text-2xl font-bold border-b-[1px] border-red-600 px-2 py-2">
            {dialogue?.title}
          </h2>
          <p className="text-lg font-semibold px-2 py-1">{dialogue?.subject}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 text-zinc-900">
        {statements.map((item) => (
          <AdminStatementContainer
            key={item.id}
            statement={item}
            setEdit={setEdit}
            setEditItem={setEditItem}
          >
            <CardStatement statement={item} />
          </AdminStatementContainer>
        ))}
      </div>
      <div className="flex">
        <button
          className="py-2 pl-2 pr-2 bg-red-500 hover:bg-red-500/80 text-white duration-200 rounded-md flex items-center gap-2"
          onClick={() => setAdd(true)}
        >
          Add
        </button>
      </div>
      {add && (
        <FormDialogueStatement
          type="add"
          statement={editItem}
          dialogue={dialogue}
          setShowForm={setAdd}
        />
      )}
      {edit && editItem && (
        <FormDialogueStatement
          type="edit"
          statement={editItem}
          dialogue={dialogue}
          setShowForm={setEdit}
        />
      )}
    </>
  );
}
