import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import { BsThreeDots } from "react-icons/bs";
import LessonDropDown from "../dropDowns/LessonDropDown";

const LessonHeader = ({
  lesson,
  setAddLessonIntro,
  setAddSection,
  setEditLessonTitle,
  setEditLessonDetails,
}) => {
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
    <div className="flex flex-1 relative px-3 z-5">
      <div className="text-center flex-1">
        <h1 className="font-medium text-xl text-zinc-800">
          {"Lesson " + lesson?.lessonNo + ": " + lesson?.title}
        </h1>
        <p>{lesson?.subtitle}</p>
      </div>
      {editMode && (
        <button title="Edit Lesson" onClick={() => setShowDropDown(true)}>
          <BsThreeDots size={28} />
        </button>
      )}
      <LessonDropDown
        lesson={lesson}
        showDropDown={showDropDown}
        setAddLessonIntro={setAddLessonIntro}
        setAddSection={setAddSection}
        setEditLessonTitle={setEditLessonTitle}
        setEditLessonDetails={setEditLessonDetails}
      />
    </div>
  );
};

export default LessonHeader;
