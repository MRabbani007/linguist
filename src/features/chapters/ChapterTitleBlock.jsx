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
    <div className="group">
      <div className="min-w-[300px]">
        {/* Card Header */}
        <div className="card__header bg-zinc-700 text-zinc-200 ">
          <span>
            {/* <TimeAgo timestamp={chapter?.createDate} /> */}
            <FaStar
              className="text-green-400 cursor-pointer"
              title="Beginner"
            />
          </span>
          <p
            className="font-extralight cursor-pointer flex flex-col hover:text-yellow-400 duration-200"
            onClick={handleOpen}
          >
            <span>
              <span>{"Chapter " + chapter?.chapterNo + ": "}</span>
              <span className="">{chapter?.title || ""}</span>
            </span>
            <span>{chapter?.subtitle || ""}</span>
          </p>
          <span>10%</span>
        </div>
        <div className="card__body bg-slate-200 relative">
          {editMode && (
            <span className="absolute bottom-2 right-2 invisible group-hover:visible">
              <CiEdit className="icon" onClick={() => setEdit(true)} />
              <CiTrash className="icon" onClick={handleDelete} />
            </span>
          )}
          <p>{chapter?.detail || ""}</p>
          <p>5 Lessons</p>
          <p>
            <span>Learning Time:</span>
            <span>5 Hours</span>
          </p>
        </div>
      </div>
      {edit && <ChapterHeaderEdit chapter={chapter} setEditChapter={setEdit} />}
    </div>
  );
};

export default ChapterTitleBlock;
