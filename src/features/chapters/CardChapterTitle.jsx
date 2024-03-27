import { useEffect, useRef, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import CardChapterEdit from "./CardChapterEdit";
import { useRemoveChapterMutation } from "./chapterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectEditMode,
  setDisplayChapter,
  setViewTab,
} from "../globals/globalsSlice";

const CardChapterTitle = ({ chapter }) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const editMode = useSelector(selectEditMode);
  const dispatch = useDispatch();

  const [removeChapter] = useRemoveChapterMutation();

  const [edit, setEdit] = useState(false);

  const handleReset = () => {
    setEdit(false);
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this Chapter? !\nEither OK or Cancel.")) {
        await removeChapter(chapter.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  const handleOpen = async () => {
    isMounted.current = true;
    dispatch(setDisplayChapter(chapter));
  };

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setViewTab("sections"));
    }
  }, [displayChapter]);

  return (
    <div className="flex items-center gap-1 group">
      {edit ? (
        <CardChapterEdit chapter={chapter} handleReset={handleReset} />
      ) : (
        <div className="min-w-[300px]">
          <div className="card__header">
            <span className="font-semibold cursor-pointer" onClick={handleOpen}>
              {chapter?.title || ""}
            </span>
            {editMode && (
              <span>
                <CiEdit
                  className="icon invisible group-hover:visible"
                  onClick={() => setEdit(true)}
                />
                <CiTrash
                  className="icon invisible group-hover:visible"
                  onClick={handleDelete}
                />
              </span>
            )}
          </div>
          <div className="card__body">
            <p>{chapter?.subtitle || ""}</p>
            <p>{chapter?.detail || ""}</p>
          </div>
          <div className="card__footer">
            <span>{/* <TimeAgo timestamp={chapter?.createDate} /> */}</span>
            <span>10% Completed</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardChapterTitle;
