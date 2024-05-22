import React from "react";

export default function UserLessonTracker() {
  return (
    <ul className="lesson-tracker">
      <li>
        <span className="w-fit whitespace-nowrap">Learning Progress</span>
        <span>40%</span>
      </li>
      <li>
        <span>Chapter 1</span>
        <span>100%</span>
      </li>
      <li>
        <span>Chapter 2</span>
        <span>100%</span>
      </li>
      <li>
        <span>Chapter 3</span>
        <span>0%</span>
      </li>
      <li>
        <span>Chapter 4</span>
        <span>0%</span>
      </li>
      <li>
        <span>Chapter 5</span>
        <span>0%</span>
      </li>
      <li>
        <span>Go to current lesson</span>
      </li>
    </ul>
  );
}
