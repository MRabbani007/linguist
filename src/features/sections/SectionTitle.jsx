import { useEffect, useRef, useState } from "react";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import SectionDropDown from "../dropDowns/SectionDropDown";

export default function SectionTitle({
  section,
  expand,
  setExpand,
  setEditTitle,
  setEditLessonID,
  setEditImage,
  setAddIntro,
  setAddDef,
  setAddList,
  setAddTable,
  setAddWord,
  setAddSentence,
}) {
  const editMode = useSelector(selectEditMode);
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="flex items-stretch group relative">
      <p className="text-accent_foreground bg-accent shrink-0 flex items-center justify-center font-medium px-4 text-lg">
        {(section?.sortIndex ? section?.sortIndex : 0).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
      <div className="flex flex-col flex-1 text-destructive_foreground">
        <div className="border-b-[1px] border-accent flex items-center gap-4">
          <h3
            onClick={() => setExpand(!expand)}
            className="font-semibold text-xl md:text-2xl px-4 py-2 flex-1"
          >
            {section?.title}
          </h3>
          {editMode && (
            <div className="relative" onBlur={() => setShowDropDown(false)}>
              <button
                title="Edit Section"
                onMouseOver={() => setShowDropDown(true)}
                className="ml-auto px-2 "
              >
                <BsThreeDots size={28} className="" />
              </button>
              <SectionDropDown
                section={section}
                showDropDown={showDropDown}
                setEditTitle={setEditTitle}
                setEditLessonID={setEditLessonID}
                setAddIntro={setAddIntro}
                setAddDef={setAddDef}
                setAddTable={setAddTable}
                setAddList={setAddList}
                setAddWord={setAddWord}
                setAddSentence={setAddSentence}
                setEditImage={setEditImage}
              />
            </div>
          )}
        </div>
        {section?.subtitle && (
          <p className=" px-4 py-1">
            <i className="">{section?.subtitle}</i>
          </p>
        )}
      </div>
    </div>
  );
}
