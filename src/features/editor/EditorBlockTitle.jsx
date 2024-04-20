import { CiEdit, CiSquareRemove } from "react-icons/ci";
import { useRemoveBlockMutation } from "../blocks/blockSlice";
import {
  selectDisplayBlock,
  setDisplayBlock,
  setViewTab,
} from "../globals/globalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EditorBlockTitle = ({ block, index }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const dispatch = useDispatch();
  const [removeBlock] = useRemoveBlockMutation();

  const isMounted = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (confirm("Delete this block? !\nEither OK or Cancel.")) {
        await removeBlock(block.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  const handleEdit = () => {};

  const handleOpen = () => {
    isMounted.current = true;
    dispatch(setDisplayBlock(block));
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setViewTab("lesson"));
      navigate("/chapters");
    }
  }, [displayBlock]);

  return (
    <tr className="">
      <td>{index + 1}</td>
      <td>{block?.title}</td>
      <td>{block?.subtitle}</td>
      <td>{block?.detail}</td>
      <td>{block?.chapterID}</td>
      <td>
        <span className="flex items-center gap-1">
          <CiEdit className="icon-md" onClick={handleOpen} />
          <CiSquareRemove className="icon-md" onClick={handleDelete} />
        </span>
      </td>
    </tr>
  );
};

export default EditorBlockTitle;
