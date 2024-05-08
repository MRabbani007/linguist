import React from "react";

export default function UserLessonTracker() {
  return (
    <ul className="lesson-tracker">
      <li>
        <span>Chapter 1</span>
        <span>40%</span>
      </li>
      <li>
        <span>Lesson 1</span>
        <span>100%</span>
      </li>
      <li>
        <span>Lesson 2</span>
        <span>100%</span>
      </li>
      <li>
        <span>Lesson 3</span>
        <span>0%</span>
      </li>
      <li>
        <span>Lesson 4</span>
        <span>0%</span>
      </li>
      <li>
        <span>Lesson 5</span>
        <span>0%</span>
      </li>
      <li>
        <span>Go to current lesson</span>
      </li>
    </ul>
  );
}
