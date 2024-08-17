import { useEffect, useRef, useState } from "react";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import SectionDropDown from "./SectionDropDown";

export default function SectionTitle({
  section,
  expand,
  setExpand,
  setEditTitle,
  setEditLessonID,
  setAddIntro,
  setAddDef,
  setAddList,
  setAddTable,
  setAddWord,
  setAddSentence,
}) {
  const editMode = useSelector(selectEditMode);

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownRef = useRef();
  const dropDownButtonRef = useRef();

  const handleDropDown = (e) => {
    if (!dropDownRef?.current?.contains(e.target)) {
      setShowDropDown(false);
      if (dropDownButtonRef.current?.contains(e.target)) {
        setShowDropDown(true);
      } else {
        setShowDropDown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropDown);
    return () => {
      document.removeEventListener("mousedown", handleDropDown);
    };
  }, []);

  return (
    <div className="flex items-stretch group relative my-6">
      <p className="text-accent_foreground bg-accent shrink-0 flex items-center justify-center text-xl md:text-2xl font-medium px-4">
        {/* {expand ? <FaCircleMinus size={40} /> : <FaCirclePlus size={40} />} */}
        {(section?.sortIndex ? section?.sortIndex : 0).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
      <div className="flex flex-col cursor-pointer flex-1 bg-destructive text-destructive_foreground">
        <div className="border-b-[1px] border-accent flex items-center gap-4">
          <h3
            onClick={() => setExpand(!expand)}
            className="font-semibold text-xl md:text-2xl px-4 py-2 flex-1"
          >
            {section?.title}
          </h3>
          {editMode && (
            <button
              ref={dropDownButtonRef}
              title="Edit Section"
              onClick={() => setShowDropDown(true)}
              className="ml-auto px-2 "
            >
              <BsThreeDots size={28} className="" />
            </button>
          )}
          <SectionDropDown
            section={section}
            showDropDown={showDropDown}
            ref={dropDownRef}
            setEditTitle={setEditTitle}
            setEditLessonID={setEditLessonID}
            setAddIntro={setAddIntro}
            setAddDef={setAddDef}
            setAddTable={setAddTable}
            setAddList={setAddList}
            setAddWord={setAddWord}
            setAddSentence={setAddSentence}
          />
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
