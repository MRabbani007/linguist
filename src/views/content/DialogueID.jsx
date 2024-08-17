import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import FormDialogueStatement from "../../features/dialogue/FormDialogueStatement";
import { useSelector } from "react-redux";
import { selectEditMode } from "../../features/globals/globalsSlice";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import FormCreateDialogue from "../../features/dialogue/FormCreateDialogue";
import DialogueNavigator from "../../features/dialogue/DialogueNavigator";
import { IoArrowBack } from "react-icons/io5";
import CardStatement from "../../features/dialogue/CardStatement";

export default function DialogueID() {
  const editMode = useSelector(selectEditMode);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [dialogue, setDialogue] = useState(null);
  const [statements, setStatements] = useState([]);

  const [display, setDisplay] = useState(false);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const fetchDialogue = async () => {
    const { status, data } = await axiosPrivate.get("/dialogue/statement", {
      params: { id },
    });
    if (status === 200) {
      setDialogue(data?.dialogue ?? null);
      setStatements(data?.statements ?? []);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDialogue();
    } else {
      navigate("/content/dialogue");
    }
  }, [id]);

  return (
    <main>
      <header className="bg-zinc-200 p-4 flex items-center text-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{dialogue?.title}</h1>
          <p className="text-xl font-semibold">{dialogue?.subject}</p>
        </div>
        {editMode ? (
          <button onClick={() => setEdit(true)}>
            <CiEdit size={30} />
          </button>
        ) : null}
        {/* <button onClick={() => setDisplay((curr) => !curr)}>
          <FaPlus size={30} />
        </button> */}
      </header>
      <div className="space-y-4 text-zinc-900">
        {statements.map((item, idx) => (
          <CardStatement statement={item} key={idx} dialogue={dialogue} />
        ))}
      </div>
      <DialogueNavigator />
      <Link to="/content/dialogue" className="flex items-center gap-2">
        <IoArrowBack size={24} />
        <span>Back to Dialogues</span>
      </Link>
      {editMode ? (
        <button onClick={() => setAdd(true)}>Add Statement</button>
      ) : null}
      {add ? (
        <FormDialogueStatement setShowForm={setAdd} dialogue={dialogue} />
      ) : null}
      {edit ? (
        <FormCreateDialogue
          type="edit"
          dialogue={dialogue}
          setShowForm={setEdit}
        />
      ) : null}
    </main>
  );
}
