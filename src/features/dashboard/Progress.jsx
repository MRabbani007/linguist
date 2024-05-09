import React from "react";
// import { RiProgress1Line } from "react-icons/ri";
import { TbProgress } from "react-icons/tb";

export default function Progress() {
  return (
    <ul className="progress">
      <li>
        <TbProgress size={32} />
        <span>Progress</span>
      </li>
      <li>
        <span>lessons</span>
        <span>10</span>
      </li>
      <li>
        <span>words</span>
        <span>120</span>
      </li>
    </ul>
  );
}
