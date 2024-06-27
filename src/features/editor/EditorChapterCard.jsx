import { CiEdit, CiSquareRemove } from "react-icons/ci";
import { useRemoveChapterMutation } from "../chapters/chapterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EditorChapterCard = ({ chapter, index }) => {
  const displayChapter = useSelector(selectDisplayChapter);

  const dispatch = useDispatch();
  const [removeChapter] = useRemoveChapterMutation();

  const isMounted = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (confirm("Delete this chapter?")) {
        await removeChapter(block.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  const handleEdit = () => {};

  const handleOpen = () => {
    isMounted.current = true;
    dispatch(setDisplayChapter(chapter));
  };

  useEffect(() => {
    if (isMounted.current) {
      navigate("/content/chapters");
    }
  }, [displayChapter]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{chapter?.title}</td>
      <td>{chapter?.subtitle}</td>
      <td>{chapter?.detail}</td>
      <td>{chapter?.id}</td>
      <td>
        {/* <span className="flex items-center gap-2">
          <CiEdit className="icon-md" onClick={handleOpen} />
          <CiSquareRemove className="icon-md" onClick={handleDelete} />
        </span> */}
      </td>
    </tr>
  );
};

export default EditorChapterCard;
