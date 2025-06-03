import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../globals/globalsSlice";

export default function LessonHeader({
  lesson,
  chapter,
}: {
  lesson: Lesson;
  chapter?: Chapter | null;
}) {
  const displayChapter = chapter ?? useSelector(selectDisplayChapter);

  if (false)
    return (
      <header className="bg-white relative mx-4 my-6 rounded-lg flex items-center">
        {/* <p
        title={`Lesson ${lesson?.sortIndex ? lesson?.sortIndex : 0}`}
        className="text-white absolute bottom-full left-1 text-sm translate-y-2 py-1 px-3 bg-accent rounded-md"
      >
        <span>
          {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </span>
      </p> */}
        <p>
          {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <h1 className="text-lg md:text-3xl font-semibold text-wrap border-0 border-accent py-2 px-4 rounded-lg">
          {lesson?.title}
        </h1>
      </header>
    );

  return (
    <header className="group bg-white rounded-lg m-4 sm:m-0">
      <div className="flex items-stretch relative">
        <p
          title={`Lesson ${lesson?.sortIndex ? lesson?.sortIndex : 0}`}
          className="w-12 bg-accent flex flex-col items-center justify-center text-base md:text-2xl font-semibold border-b-4 border-destructive text-accent_foreground rounded-tl-lg"
        >
          {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-wrap flex items-center px-4 py-2 border-accent border-b-4 flex-1 text-destructive_foreground">
          {lesson?.title}
        </h1>
      </div>
      <div className="flex items-stretch">
        <p
          title={`Chapter ${
            displayChapter?.chapterNo ? displayChapter?.chapterNo : 0
          }`}
          className="w-12 py-1 text-accent_foreground bg-accent flex flex-col items-center justify-center text-base font-semibold rounded-bl-lg"
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
}
