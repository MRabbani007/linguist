import { useRef, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useRemoveChapterMutation } from "./chapterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectEditMode,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ChapterHeaderEdit from "./ChapterHeaderEdit";

const ChapterTitleBlock = ({ chapter }) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const editMode = useSelector(selectEditMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [removeChapter] = useRemoveChapterMutation();

  const [edit, setEdit] = useState(false);

  const isMounted = useRef(null);

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
    // setTemp(!temp);
    navigate("/sections");
  };

  // const [temp, setTemp] = useState(true);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     dispatch(setViewTab("sections"));
  //   }
  // }, [displayChapter, temp]);

  return (
    <>
      <div className="group flex flex-col flex-1 justify-stretch">
        {/* Card Header */}
        <div className="card__header text-white bg-red-600 font-light h-16">
          <span>
            {/* <TimeAgo timestamp={chapter?.createDate} /> */}
            <FaStar
              className="text-green-400 cursor-pointer"
              title="Beginner"
            />
          </span>
          <div
            className="cursor-pointer hover:text-yellow-400 duration-200"
            onClick={handleOpen}
          >
            <p>
              <span>{"Chapter " + chapter?.chapterNo + ": "}</span>
              <span className="">{chapter?.title || ""}</span>
            </p>
            <p className="">{chapter?.subtitle || ""}</p>
          </div>
          <span>10%</span>
        </div>
        <div className="card__body text-zinc-800 bg-zinc-50 border-l-2 border-r-2 border-red-600 relative min-h-24">
          {editMode && (
            <span className="absolute bottom-2 right-2 invisible group-hover:visible">
              <CiEdit className="icon" onClick={() => setEdit(true)} />
              <CiTrash className="icon" onClick={handleDelete} />
            </span>
          )}
          <p>{chapter?.detail || ""}</p>
        </div>
        <div className="card__footer border-2 border-red-600 text-red-600 bg-zinc-50 font-medium justify-between flex">
          <span>{chapter?.lessons && `${chapter?.lessons} Lessons`}</span>
          <span>10 Hours</span>
        </div>
      </div>
      {edit && <ChapterHeaderEdit chapter={chapter} setEditChapter={setEdit} />}
    </>
  );
};

export default ChapterTitleBlock;
