import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardChapterTitle from "./CardChapterTitle";
import CardChapterAdd from "./CardChapterAdd";
import { useSelector } from "react-redux";

import { getChapters } from "../../context/chapterSlice";

const SectionChapterList = () => {
  const { chapters, editMode } = useContext(GlobalContext);
  // const chapters = useSelector(getChapters);

  // const orderedChapters = chapters
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-xl text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400">
        Chapters
      </h2>
      <div className="flex flex-wrap flex-row items-stretch justify-center gap-3">
        {Array.isArray(chapters) &&
          chapters.map((item, index) => {
            return <CardChapterTitle chapter={item} key={index} />;
          })}
      </div>
      {editMode && <CardChapterAdd />}
    </div>
  );
};

export default SectionChapterList;
