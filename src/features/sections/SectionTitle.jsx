import { useEffect, useRef, useState } from "react";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import SectionDropDown from "./SectionDropDown";
import { TbPoint } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

export default function SectionTitle({
  section,
  expand,
  setExpand,
  setEditTitle,
  setAddIntro,
  setAddDef,
  setAddList,
  setAddTable,
  setAddWord,
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
    <div className="flex items-center gap-2 group relative w-fit">
      <div>
        <h3 className=" text-red-600 flex items-center gap-3">
          <TbPoint className="inline" size={26} />
          <div>
            <p className="font-bold text-xl">{section?.title}</p>
            {section?.subtitle && (
              <i className="text-zinc-900">{section?.subtitle}</i>
            )}
          </div>
          <button onClick={() => setExpand(!expand)}>
            <IoIosArrowForward
              size={24}
              className={(expand ? "rotate-90" : "") + " duration-200"}
            />
          </button>
        </h3>
      </div>
      {editMode && (
        <button
          ref={dropDownButtonRef}
          title="Edit Section"
          onClick={() => setShowDropDown(true)}
        >
          <BsThreeDots size={28} />
        </button>
      )}
      <SectionDropDown
        section={section}
        showDropDown={showDropDown}
        ref={dropDownRef}
        setEditTitle={setEditTitle}
        setAddIntro={setAddIntro}
        setAddDef={setAddDef}
        setAddTable={setAddTable}
        setAddList={setAddList}
        setAddWord={setAddWord}
      />
    </div>
  );
}
