import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../globals/globalsSlice";

export default function LessonHeader({ lesson }: { lesson: Lesson }) {
  const displayChapter = useSelector(selectDisplayChapter);

  return (
    <header className="group">
      <div className="flex items-stretch relative">
        <p
          title={`Lesson ${lesson?.sortIndex ? lesson?.sortIndex : 0}`}
          className="w-12 bg-accent flex flex-col items-center justify-center text-base md:text-2xl font-semibold border-b-4 border-destructive text-accent_foreground"
        >
          {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold text-wrap flex items-center px-4 py-2 border-accent border-b-4 flex-1 text-destructive_foreground">
          {lesson?.title}
        </h1>
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
        <p className="flex items-center px-4">{lesson?.title}</p>
      </div>
    </header>
  );
}
