import { useState } from "react";
import { motion } from "framer-motion";

export default function Sentence({
  sentence,
  display,
}: {
  sentence: Sentence;
  display?: string;
}) {
  // const language = useSelector(selectLanguage);
  // const lesson = useSelector(
  //   selectLessonbyID(language?.id ?? "", sentence?.lessonID)
  // );
  const [expand, setExpand] = useState(false);

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

  const baseWordIndex = -1;

  return (
    <motion.div
      key={sentence.id}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="w-full relative group flex items-stretch bg-red-50/50"
    >
      <div className={"w-1 min-h-full shrink-0 " + color}></div>
      <div
        className={display === "condensed" ? "py-2 px-4" : "p-4" + " flex-1 "}
      >
        <div className="w-fit font-medium " title={sentence?.pronunce}>
          <p
            className="font-medium text-zinc-900 tracking-wider text-lg"
            onClick={() => setExpand((curr) => !curr)}
          >
            {sentence?.text.split(" ").map((sentWord, idx) => (
              <span
                key={idx}
                className={baseWordIndex === idx ? "underline" : ""}
              >
                {sentWord + " "}
              </span>
            ))}
          </p>
          <p>{sentence?.caption}</p>
        </div>
        {sentence?.translation && (expand || display !== "condensed") && (
          <p className="text-sm tracking-wide text-zinc-800">
            <span>
              <i>{sentence?.translation}</i>
            </span>
            <span>
              <i>{sentence?.caption}</i>
            </span>
          </p>
        )}
        {/* {display && display === "condensed" ? null : (
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
        )} */}
      </div>
    </motion.div>
  );
}
