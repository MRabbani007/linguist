import React from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

const SENTENCE_SORT = [
  // { label: "Create Date", value: "createDate" },
  { label: "Sentence", value: "translation" },
  { label: "Topic", value: "group" },
  { label: "Lesson", value: "lessonID" },
  { label: "Base Word", value: "baseWordTranslation" },
  { label: "Difficulty", value: "level" },
];

export default function SortSentences({ sort, setSort }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mx-auto">
      {SENTENCE_SORT.map((item, index) => {
        const isActive = item.value === sort.sort;
        const isAssceding = sort.asscending === true ? true : false;
        return (
          <div className={" flex items-center gap-2"} key={index}>
            <button
              onClick={() => setSort({ sort: item.value, asscending: true })}
              className={
                (isActive && isAssceding
                  ? "border-yellow-500 text-yellow-500 "
                  : "border-zinc-700") + " p-0 border-2 rounded-md duration-200"
              }
            >
              <IoIosArrowRoundDown size={30} />
            </button>
            <button
              onClick={() => setSort({ sort: item.value, asscending: false })}
              className={
                (isActive && !isAssceding
                  ? "border-yellow-500 text-yellow-500"
                  : "border-zinc-700") + " p-0 border-2 rounded-md duration-200"
              }
            >
              <IoIosArrowRoundUp size={30} />
            </button>
            <span
              className={(isActive ? "text-yellow-500 " : "") + " duration-200"}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
