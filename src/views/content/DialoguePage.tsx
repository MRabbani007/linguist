import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { Dialogue } from "../../types/types";
import FormCreateDialogue from "../../features/dialogue/FormCreateDialogue";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEditMode } from "../../features/globals/globalsSlice";

export default function DialoguePage() {
  const editMode = useSelector(selectEditMode);
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);

  const [add, setAdd] = useState(false);

  const fetchDialogues = async () => {
    const response = await axiosPrivate.get("/dialogue");

    if (response.status === 200 && Array.isArray(response.data)) {
      setDialogues(response.data);
    }
  };

  useEffect(() => {
    fetchDialogues();
  }, []);

  return (
    <main>
      <header>
        <h1 className="font-bold text-3xl">Dialogues</h1>
      </header>
      <div className="space-y-4">
        {dialogues.map((item, index) => {
          return (
            <div key={index} className="bg-zinc-200 py-4 px-8 rounded-lg">
              <Link
                to={{
                  pathname: "/content/dialogue/id",
                }}
                state={{ id: item.id }}
                className="text-2xl font-semibold"
              >
                <span className="mr-2">{item.sortIndex}.</span>
                <span>{item?.title}</span>
              </Link>
              <p className="text-sm">{item?.subtitle}</p>
              {/* <p>{item.createdAt?.toString().substring(0, 10)}</p> */}
            </div>
          );
        })}
      </div>
      {editMode ? <button onClick={() => setAdd(true)}>Create</button> : null}
      {add ? <FormCreateDialogue type="add" setShowForm={setAdd} /> : null}
    </main>
  );
}