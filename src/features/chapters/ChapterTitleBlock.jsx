import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ChapterTitleBlock = ({ chapter, lessonCount = 0 }) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = async () => {
    isMounted.current = true;
    dispatch(setDisplayChapter(chapter));
    navigate("/content/sections");
  };

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
        <div className="card__body text-zinc-800 bg-zinc-100 relative min-h-24">
          <p>{chapter?.detail || ""}</p>
        </div>
        <div className="card__footer text-red-600 bg-zinc-100 font-medium justify-between flex">
          <span>{`${lessonCount} Lessons`}</span>
          <span>10 Hours</span>
        </div>
      </div>
    </>
  );
};

export default ChapterTitleBlock;
