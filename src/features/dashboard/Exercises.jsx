import React from "react";
import { BsSpellcheck } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";
import { RiRunLine } from "react-icons/ri";
import { TbArrowsJoin } from "react-icons/tb";
import { Link } from "react-router-dom";
// import { TbTextGrammar } from "react-icons/tb";
import { MdOutlineSpellcheck } from "react-icons/md";

const EXERCISE_ITEMS = [
  {
    title: "Match Words",
    url: "/exercise/matchwords",
    icon: <TbArrowsJoin size={32} />,
    style: "from-red-700 to-red-500",
  },
  {
    title: "Flash Cards",
    url: "/exercise/flashcards",
    icon: <GiCardRandom size={32} />,
    style: "from-sky-700 to-sky-500",
  },
  {
    title: "Reading",
    url: "/exercise/reading",
    icon: <FaBookReader size={32} />,
    style: "from-green-700 to-green-500",
  },
  {
    title: "Spelling",
    url: "/exercise/spelling",
    icon: <BsSpellcheck size={32} />,
    style: "from-yellow-600 to-yellow-400",
  },
];

export default function Exercises() {
  return (
    <div>
      <div className="flex items-center gap-4 rounded-lg py-2 px-4 bg-purple-600 text-white font-medium mb-4">
        <RiRunLine size={32} />
        <span>Exercise</span>
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        {EXERCISE_ITEMS.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item?.url}
                className={
                  "flex flex-col items-center gap-4 p-8 rounded-lg bg-gradient-to-b text-white w-48 " +
                  item?.style
                }
              >
                {item?.icon}
                <span>{item?.title}</span>
              </Link>
            </li>
          );
        })}
        {/* <li>
        <MdOutlineSpellcheck size={32} />
        <span>Grammar</span>
      </li> */}
      </ul>
    </div>
  );
}
