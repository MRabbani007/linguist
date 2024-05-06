import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useRemoveBlockMutation } from "./blockSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode, setDisplayBlock } from "../globals/globalsSlice";
import { useNavigate } from "react-router-dom";
import LessonHeaderEdit from "./LessonHeaderEdit";

const CardBlockTitle = ({ block }) => {
  const [removeBlock] = useRemoveBlockMutation();

  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const blockOpen = () => {
    dispatch(setDisplayBlock(block));
    navigate("/lesson");
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this block?")) {
        await removeBlock(block.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  return (
    <div className="group">
      {edit ? (
        <LessonHeaderEdit lesson={block} setEdit={setEdit} />
      ) : (
        <div className="flex flex-col gap-2 bg-zinc-300 rounded-md w-[300px] h-full">
          {/* Header */}
          <div
            className="flex flex-col items-center bg-sky-800 text-yellow-100 hover:text-yellow-400 duration-200 py-2 px-4 rounded-t-md cursor-pointer"
            onClick={blockOpen}
          >
            <span className="font-light">{block?.title}</span>
          </div>
          {/* Body */}
          <div className="flex-1 flex flex-col justify-between gap-2 relative py-2 px-4">
            <span>{block?.subtitle}</span>
            <span>{block?.detail}</span>
            <span>{block?.firstLang + " / " + block?.secondLang}</span>
            {editMode && (
              <span className="absolute bottom-2 right-2">
                <CiEdit
                  className="icon invisible group-hover:visible "
                  onClick={toggleEdit}
                />
                <CiTrash
                  className="icon invisible group-hover:visible "
                  onClick={handleDelete}
                />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardBlockTitle;
