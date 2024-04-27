import React, { useState } from "react";
import LessonIntroItem from "./LessonIntroItem";
import LessonIntroAdd from "./LessonIntroAdd";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function LessonIntro({ lesson }) {
  const editMode = useSelector(selectEditMode);
  const [add, setAdd] = useState(false);

  return (
    <article>
      {Array.isArray(lesson?.introduction)
        ? lesson.introduction.map((intro, index) => {
            return (
              <LessonIntroItem
                lesson={lesson}
                intro={intro}
                index={index}
                key={index}
              />
            );
          })
        : lesson?.introduction}
      <div className="flex flex-wrap items-center gap-3">
        {editMode ? (
          <button onClick={() => setAdd(true)} className="btn btn-red">
            <span>Add Lesson Introduction </span>
            {/* <CiSquarePlus size={34} /> */}
          </button>
        ) : null}
        {add ? <LessonIntroAdd lesson={lesson} setAdd={setAdd} /> : null}
      </div>
    </article>
  );
}
