import { useState } from "react";
import { CiEdit, CiSquareCheck, CiTrash } from "react-icons/ci";
import { useRemoveBlockMutation } from "./blockSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditMode,
  setDisplayBlock,
  setViewTab,
} from "../globals/globalsSlice";
import CardBlockEditHeader from "./CardBlockEditHeader";

const CardBlockTitle = ({ block }) => {
  const [removeBlock] = useRemoveBlockMutation();

  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const blockOpen = () => {
    dispatch(setDisplayBlock(block));
    dispatch(setViewTab("lesson"));
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this block? !\nEither OK or Cancel.")) {
        await removeBlock(block.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  return (
    <div className="group">
      {edit ? (
        <CardBlockEditHeader toggleEdit={toggleEdit} block={block} />
      ) : (
        <div className="flex flex-col gap-2 bg-zinc-300 rounded-lg w-[300px] h-full">
          {/* Header */}
          <div className="flex justify-between items-center bg-sky-800 text-yellow-100 py-2 px-4 rounded-t-lg">
            <span>{block?.firstLang + " / " + block?.secondLang}</span>
            {editMode && (
              <span>
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
          <div className="flex-1">
            <div
              className="flex items-center justify-center gap-2 py-2 px-4 text-zinc-900 cursor-pointer hover:text-yellow-600 duration-200"
              onClick={blockOpen}
            >
              <span className="font-semibold">{block?.title}</span>
              <span>{block?.subtitle}</span>
            </div>
            <div className=" py-2 px-4">
              <span>{block?.detail}</span>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-between items-center bg-sky-800 text-yellow-100 py-2 px-4 rounded-b-lg">
            <span>Beginner</span>
            <span>
              <CiSquareCheck className="icon" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardBlockTitle;
