import { useSelector } from "react-redux";
import { selectLessonbyID } from "../globals/globalsApiSlice";
import { selectLanguage } from "../globals/globalsSlice";
import { Link } from "react-router-dom";

export default function Sentence({
  sentence,
  display,
}: {
  sentence: Sentence;
  display?: string;
}) {
  const language = useSelector(selectLanguage);
  const lesson = useSelector(
    selectLessonbyID(language?.id ?? "", sentence?.lessonID)
  );

  const color = !!sentence?.level
    ? sentence.level < 2
      ? "bg-sky-500"
      : sentence.level < 4
      ? "bg-green-500"
      : sentence.level < 7
      ? "bg-yellow-400"
      : sentence.level < 9
      ? "bg-orange-400"
      : "bg-red-500"
    : "bg-zinc-300";

  return (
    <div className="w-full relative group flex items-stretch bg-zinc-100">
      <div className={"w-1 min-h-full shrink-0 " + color}></div>
      <div className="flex-1 p-4">
        <p className="w-fit font-medium" title={sentence?.pronunce}>
          <span className="font-semibold text-red-700 text-lg">
            {sentence?.text}
          </span>
          <span>{sentence?.caption}</span>
        </p>
        {sentence?.translation && display !== "condensed" && (
          <p>
            <span>
              <i>{sentence?.translation}</i>
            </span>
            <span>
              <i>{sentence?.caption}</i>
            </span>
          </p>
        )}
        {display && display === "condensed" ? null : (
          <div className="flex items-center gap-4 text-sm mt-1">
            {sentence?.baseWord && (
              <p
                className="py-1 px-2 bg-white rounded-md"
                title={sentence?.baseWordTranslation}
              >
                {sentence?.baseWord}
              </p>
            )}
            {lesson?.title && (
              <Link
                to={`/learn/lesson?=title=${lesson?.title}&id=${lesson?.id}`}
                className="py-1 px-2 bg-sky-100 rounded-md"
              >
                {lesson?.title}
              </Link>
            )}
            {sentence?.type && (
              <p className="py-1 px-2 bg-green-100 rounded-md">
                {sentence?.type}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
