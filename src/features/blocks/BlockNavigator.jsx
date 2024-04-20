import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBlocks, useGetBlocksQuery } from "./blockSlice";
import {
  selectDisplayBlock,
  selectDisplayChapter,
} from "../globals/globalsSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { selectAllChapters } from "../chapters/chapterSlice";
import { selectAllWords } from "../words/wordsSlice";

const BlockNavigator = () => {
  const blocks = useSelector(selectAllBlocks);
  const displayBlock = useSelector(selectDisplayBlock);

  console.log(blocks);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // const temp = blocks?.findIndex((item) => (item.id = displayBlock.id));
    // if (temp >= 0) {
    //   setIndex(temp);
    //   console.log(temp);
    // }
  }, [displayBlock, blocks]);

  return (
    <div className="flex justify-between items-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400 group relative">
      <button>
        <FaChevronLeft className="icon" />
        <span>Previous Lesson</span>
      </button>
      <button>
        <span>Next Lesson</span>
        <FaChevronRight className="icon" />
      </button>
    </div>
  );
};

export default BlockNavigator;
