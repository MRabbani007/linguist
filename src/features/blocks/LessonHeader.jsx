import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayChapter, selectEditMode } from "../globals/globalsSlice";
import { BsThreeDots } from "react-icons/bs";
import LessonDropDown from "../dropDowns/LessonDropDown";
import FormLessonImage from "./FormLessonImage";

const LessonHeader = ({ lesson, setAddLessonIntro, setAddSection }) => {
  const editMode = useSelector(selectEditMode);
  const displayChapter = useSelector(selectDisplayChapter);

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

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleDropDown);
  //   return () => {
  //     document.removeEventListener("mousedown", handleDropDown);
  //   };
  // }, []);

  const temp1 = (
    <header className="group">
      <div className="flex items-stretch relative">
        <p
          title={`Lesson ${lesson?.sortIndex ? lesson?.sortIndex : 0}`}
          className="w-12 lg:min-h-[80px] bg-accent flex flex-col items-center justify-center text-base md:text-2xl font-semibold border-b-4 border-destructive text-accent_foreground"
        >
          <span>
            {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString(
              "en-US",
              {
                minimumIntegerDigits: 2,
                useGrouping: false,
              }
            )}
          </span>
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold text-wrap flex items-center px-4 border-accent border-b-4 flex-1 text-destructive_foreground">
          {lesson?.title}
        </h1>
        {editMode && (
          <div className="absolute top-1/2 right-4">
            <div
              className="relative invisible group-hover:visible "
              onMouseLeave={() => setShowDropDown(false)}
            >
              <button
                title="Edit Lesson"
                className=""
                // onClick={() => setShowDropDown(true)}
                onMouseEnter={() => setShowDropDown(true)}
              >
                <BsThreeDots size={28} />
              </button>
              <LessonDropDown
                lesson={lesson}
                showDropDown={showDropDown}
                setAddLessonIntro={setAddLessonIntro}
                setAddSection={setAddSection}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-stretch">
        <p
          title={`Chapter ${
            displayChapter?.chapterNo ? displayChapter?.chapterNo : 0
          }`}
          className="w-12 py-1 text-accent_foreground bg-accent flex flex-col items-center justify-center text-base font-semibold"
        >
          <span>
            {(displayChapter?.chapterNo ?? "").toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </span>
        </p>
        <p className="flex items-center px-4">{displayChapter?.title}</p>
      </div>
    </header>
  );

  const temp2 = (
    <header className="group relative bg-destructive pt-8 px-4 mt-4">
      <div className="flex items-stretch justify-start">
        {/* Lesson No */}
        {/* w-16 h-16 md:w-24 md:h-24 */}
        <p
          title={`Lesson ${lesson?.sortIndex ? lesson?.sortIndex : 0}`}
          className="w-20 h-[120px] text-accent_foreground bg-accent flex flex-col items-center justify-center text-2xl md:text-4xl font-bold"
        >
          <span>
            {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString(
              "en-US",
              {
                minimumIntegerDigits: 2,
                useGrouping: false,
              }
            )}
          </span>
          <span>{displayChapter?.chapterNo || ""}</span>
        </p>
        <div className="flex flex-col gap-1 text-destructive_foreground flex-1">
          <h1 className="text-4xl md:text-7xl font-semibold text-wrap inline py-1 px-2 border-accent border-b-4">
            {lesson?.title}
          </h1>
          <p className="py-1 px-2">{lesson?.subtitle}</p>
        </div>
      </div>
      {/* {lesson?.lessonImage ? (
    <div className="h-[200px] w-[300px] mx-auto">
      <img src={lesson?.lessonImage} alt="alphabet" className="h-full" />
    </div>
  ) : null} */}
      {/* <p>{lesson?.details}</p> */}
      {/* {lesson?.subtitle ? (
      <p className="font-light text-wrap">{lesson?.subtitle}</p>
    ) : null} */}
      {editMode && (
        <div className="absolute top-1/2 -translate-y-1/2 right-4 invisible group-hover:visible flex items-center gap-4">
          <FormLessonImage lesson={lesson} />
          <button title="Edit Lesson" onClick={() => setShowDropDown(true)}>
            <BsThreeDots size={28} />
          </button>
        </div>
      )}
      <LessonDropDown
        lesson={lesson}
        showDropDown={showDropDown}
        setAddLessonIntro={setAddLessonIntro}
        setAddSection={setAddSection}
      />
    </header>
  );

  return temp1;
};

export default LessonHeader;
