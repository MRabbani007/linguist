import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectChapters,
  selectDisplayBlock,
  selectDisplayChapter,
} from "../globals/globalsSlice";

const ChapterListSideBar = ({ setViewSideBar }) => {
  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const progress = useSelector(selectProgress);

  const chapterProgress = progress.find((c) => c.id === chapter.id);

  const [expandedIndex, setExpandedIndex] = useState(0);

  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    setExpandedIndex(() => {
      let idx = chapters.findIndex((item) => item.id === displayChapter?.id);
      if (idx >= 0) {
        return idx;
      } else {
        return 0;
      }
    });
  }, [chapters, displayChapter, displayBlock]);

  const temp = showMore ? chapters : chapters.slice(0, 6);

  let content = temp.map((chapter, index) => (
    <div>
      <div
        className={
          (displayChapter?.id === chapter?.id
            ? "border-red-600 "
            : "border-white ") +
          (index === 0 ? " border-t-2 " : "") +
          " flex items-center justify-between cursor-pointer duration-200 py-2 px-4 border-b-2 "
        }
        onClick={handleOpen}
      >
        <p className="">{chapter.title}</p>
        <MdOutlineKeyboardArrowRight
          size={30}
          className={
            (index === expandedIndex ? "rotate-90 duration-200" : "") +
            " inline"
          }
        />
      </div>
      <ul className="flex flex-col items-start">
        {lessons
          .filter((l) => l.chapterID === chapter.id)
          .map((lesson) => (
            <SectionTitle
              key={lesson?.id}
              lesson={lesson}
              chapter={chapter}
              setViewSideBar={setViewSideBar}
            />
          ))}
      </ul>
    </div>
  ));

  return (
    <div className="p-0 flex flex-col overflow-y-auto h-full">{content}</div>
  );
};

export default ChapterListSideBar;
