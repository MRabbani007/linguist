import { useState } from "react";
import SectionIntroItem from "./SectionIntroItem";
import SectionIntroAdd from "./SectionIntroAdd";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function SectionIntro({ section }) {
  const editMode = useSelector(selectEditMode);

  const [add, setAdd] = useState(false);

  return (
    <article>
      {Array.isArray(section?.introduction)
        ? section.introduction.map((intro, index) => {
            return (
              <SectionIntroItem
                section={section}
                intro={intro}
                index={index}
                key={index}
              />
            );
          })
        : section?.introduction}
      <div className="flex flex-wrap items-center gap-2">
        {editMode ? (
          <button onClick={() => setAdd(true)} className="btn btn-red">
            Add Section Introduction
          </button>
        ) : null}
        {add ? <SectionIntroAdd section={section} setAdd={setAdd} /> : null}
      </div>
    </article>
  );
}
