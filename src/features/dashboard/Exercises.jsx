import React from "react";
import { Link } from "react-router-dom";

export default function Exercises() {
  return (
    <ul className="dashboard-exercises">
      <li>Exercises</li>
      <li>
        <Link to={"/exercise"}>Match Words</Link>
      </li>
      <li>Spelling</li>
      <li>Random Words</li>
      <li>Reading</li>
      <li>Listening</li>
    </ul>
  );
}
