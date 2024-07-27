import React, { useEffect } from "react";
import { BsCheck2 } from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { selectLessons, setProgress } from "../globals/globalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "../profile/profileSlice";

const PROGRESS = [
  { lessonNo: 1.1, lesson: "Alphabets", status: "completed", id: "" },
  { lessonNo: 1.2, lesson: "Greetings", status: "completed", id: "" },
  { lessonNo: 1.3, lesson: "Days & Months", status: "completed", id: "" },
  { lessonNo: 1.4, lesson: "Numbers & Counting", status: "started", id: "" },
  { lessonNo: 1.5, lesson: "Verbs", status: "", id: "" },
];

export default function UserLessonTracker() {
  const dispatch = useDispatch();

  const { data: profile, isLoading, isSuccess } = useGetProfileQuery();
  const lessons = useSelector(selectLessons);

  useEffect(() => {
    if (isSuccess && Array.isArray(profile) && profile[0]?.progress) {
      dispatch(setProgress(profile[0].progress));
    }
  }, [profile]);

  console.log(profile[0].progress);

  return (
    <div className="w-full flex-1">
      <div className="flex items-center gap-4 rounded-lg py-2 px-4 bg-purple-600 text-white font-medium mb-4">
        <AiFillSignal size={32} />
        <span>Progress</span>
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-4 w-full">
        {lessons.map((item, index) => {
          const lessonProgress = profile[0].progress.find(
            (prog) => prog.lessonID === item.id
          );
          const style =
            lessonProgress?.completed === true
              ? "from-green-400 to-green-500"
              : lessonProgress?.completed === false
              ? "from-sky-400 to-sky-500"
              : "from-zinc-400 to-zinc-400";
          return (
            <li
              key={index}
              className={
                "w-36 h-36 bg-gradient-to-b text-white flex flex-col items-center justify-center rounded-lg relative " +
                style
              }
            >
              <p className="absolute top-0 left-1/2 -translate-x-1/2 py-1 px-4 bg-red-400 rounded-b-md">
                {item.sortIndex}
              </p>
              <span className="text-pretty text-center">{item.title}</span>
              {item.status === "completed" ? (
                <BsCheck2
                  size={40}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 py-1 px-2 rounded-t-md"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
