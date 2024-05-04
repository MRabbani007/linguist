import { useState } from "react";
import SectionIntroItem from "./SectionIntroItem";
import SectionIntroAdd from "./SectionIntroAdd";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function SectionIntro({ section, add, setAdd }) {
  const editMode = useSelector(selectEditMode);

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
      {add ? <SectionIntroAdd section={section} setAdd={setAdd} /> : null}
    </article>
  );
}
