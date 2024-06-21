import React from "react";
import { BsSpellcheck } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";
import { RiRunLine } from "react-icons/ri";
import { TbArrowsJoin } from "react-icons/tb";
import { Link } from "react-router-dom";
// import { TbTextGrammar } from "react-icons/tb";
import { MdOutlineSpellcheck } from "react-icons/md";

export default function Exercises() {
  return (
    <ul className="dashboard-exercises">
      <li>
        <RiRunLine size={32} />
        <span>Exercises</span>
      </li>
      <li>
        <Link to={"/exercise/matchwords"} className="flex items-center gap-3">
          <TbArrowsJoin size={32} />
          <span>Match Words</span>
        </Link>
      </li>
      <li>
        <Link to={"/exercise/flashcards"} className="flex items-center gap-3">
          <GiCardRandom size={32} />
          <span>Flash Cards</span>
        </Link>
      </li>
      <li>
        <Link to={"/exercise/reading"} className="flex items-center gap-3">
          <FaBookReader size={32} />
          <span>Reading</span>
        </Link>
      </li>
      <li>
        <Link to={"/exercise/spelling"} className="flex items-center gap-3">
          <BsSpellcheck size={32} />
          <span>Spelling</span>
        </Link>
      </li>
      {/* <li>
        <MdOutlineSpellcheck size={32} />
        <span>Grammar</span>
      </li> */}
    </ul>
  );
}
