import FormCreateDialogue from "../../features/dialogue/FormCreateDialogue";
import { useEffect, useState } from "react";
import { useLazyGetAdminDialoguesQuery } from "@/features/dialogue/dialogueSlice";
import DialogueImg from "/assets/dialogue.png";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

export default function AdminDialogues() {
  const [getDialogues, { data, isLoading, isSuccess, isError }] =
    useLazyGetAdminDialoguesQuery();

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Dialogue | null>(null);

  useEffect(() => {
    getDialogues(1);
  }, []);

  return (
    <div>
      <div className="flex-1 flex flex-wrap flex-col sm:flex-row items-stretch gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error Loading Dialogues</p>
        ) : (
          isSuccess &&
          data?.data?.map((item, index) => {
            return (
              <div
                key={item.id}
                className="bg-zinc-50 py-4 px-4 rounded-lg w-full min-w-[300px] max-w-[400px] lg:max-w-[500px] flex-1 flex justify-center items-center gap-4 relative"
              >
                <img src={DialogueImg} className="w-10 h-10" />
                <div className="">
                  <Link
                    to={`/admin/dialogues/edit?id=${item.id}`}
                    className="md:text-xl font-semibold"
                  >
                    <span className="mr-2">{index + 1}.</span>
                    <span>{item?.title}</span>
                  </Link>
                  <p className="text-xs md:text-sm">{item?.subtitle}</p>
                </div>
                <button
                  onClick={() => {
                    setEdit(true);
                    setEditItem(item);
                  }}
                  className="absolute top-2 right-2"
                >
                  <CiEdit size={20} />
                </button>
              </div>
            );
          })
        )}
      </div>
      {add ? <FormCreateDialogue type="add" setShowForm={setAdd} /> : null}
      {edit && editItem && (
        <FormCreateDialogue
          type="edit"
          setShowForm={setEdit}
          dialogue={editItem}
        />
      )}
    </div>
  );
}
