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
        <Link to={"/exercise"} className="flex items-center gap-3">
          <TbArrowsJoin size={32} />
          Match Words
        </Link>
      </li>
      <li>
        <GiCardRandom size={32} />
        <span>Flash Cards</span>
      </li>
      <li>
        <FaBookReader size={32} />
        <span>Reading</span>
      </li>
      <li>
        <BsSpellcheck size={32} />
        <span>Spelling</span>
      </li>
      <li>
        <MdOutlineSpellcheck size={32} />
        <span>Grammar</span>
      </li>
    </ul>
  );
}
