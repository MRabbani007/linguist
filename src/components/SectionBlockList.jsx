import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import CardBlockTitle from "../features/chapterPage/CardBlockTitle";
import CardBlockAdd from "./CardBlockAdd";

const SectionBlockList = () => {
  return (
    <div
      className={
        displayChapter === "" || displayChapter === undefined ? "hidden" : ""
      }
    >
      {/* Chapter Title */}
      <h3 className="font-semibold text-xl p-2 bg-slate-200 rounded-lg shadow-md shadow-slate-400">
        Sections
      </h3>
      <div className="flex flex-wrap gap-2">
        {/* Left Column Lessons */}
        <div className=" min-w-[200px] ">{/* Add Block */}</div>
        {/* Right Column Word Blocks */}
        <div className="shrink-0 grow">
          {!!displayBlock && Array.isArray(displayBlock)
            ? displayBlock.map((block, index) => {
                // return <SectionDisplayWords block={block} key={index} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default SectionBlockList;
