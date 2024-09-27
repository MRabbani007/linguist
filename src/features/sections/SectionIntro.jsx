import SectionIntroItem from "./SectionIntroItem";
import SectionIntroAdd from "./SectionIntroAdd";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function SectionIntro({ section, add, setAdd }) {
  const editMode = useSelector(selectEditMode);

  return (
    <>
      {Array.isArray(section?.introduction) &&
      section.introduction.length !== 0 ? (
        <article className="flex flex-col gap-4">
          {section.introduction.map((intro, index) => {
            return (
              <SectionIntroItem
                section={section}
                intro={intro}
                index={index}
                key={index}
              />
            );
          })}
        </article>
      ) : null}
      {add ? <SectionIntroAdd section={section} setAdd={setAdd} /> : null}
    </>
  );
}
