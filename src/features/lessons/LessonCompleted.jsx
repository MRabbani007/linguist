import React, { useEffect, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayLesson, setProgress } from "../globals/globalsSlice";

export default function LessonCompleted() {
  const dispatch = useDispatch();
  const displayBlock = useSelector(selectDisplayLesson);
  const [updateProfile] = useUpdateProfileMutation();

  const { data: profile, isLoading, isSuccess } = useGetProfileQuery();

  useEffect(() => {
    if (isSuccess && Array.isArray(profile) && profile[0]?.progress) {
      dispatch(setProgress(profile[0].progress));
    }
  }, [profile]);

  // const chap =
  //   Array.isArray(profile) &&
  //   profile[0]?.chapters &&
  //   profile[0]?.chapters.find((c) => c?.id === displayBlock?.chapterID);

  // const progress =
  //   chap?.lessons && chap?.lessons.find((l) => l.id === displayBlock.id);

  const progress =
    isSuccess &&
    Array.isArray(profile) &&
    profile[0]?.progress &&
    profile[0].progress.find((item) => item?.lessonID === displayBlock.id);

  const [lessonCompleted, setLessonCompleted] = useState(false);

  const toggleLessonCompleted = async (completed) => {
    await updateProfile({
      type: "PROGRESS",
      data: {
        chapterID: displayBlock?.chapterID,
        lessonID: displayBlock?.id,
        completed,
      },
    });
  };

  useEffect(() => {
    setLessonCompleted(false);
  }, [displayBlock]);

  useEffect(() => {
    const checkScroll = () => {
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight
      ) {
        setLessonCompleted(true);
        toggleLessonCompleted(true);
      } else {
        // setLessonCompleted(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const isCompleted = progress?.completed || lessonCompleted;

  return (
    <div className="flex flex-col items-center group">
      <div className="flex flex-row items-center justify-center gap-8 mt-20 mb-6">
        <button
          className={
            (isCompleted
              ? "border-green-500 text-green-500 bg-zinc-50"
              : "border-zinc-600 text-zinc-600") +
            " border-4 rounded-full p-4 bg-zinc-400 w-fit duration-500 hover:border-yellow-500 hover:text-yellow-500"
          }
          title="Mark Incomplete?"
          onClick={() => toggleLessonCompleted(false)}
        >
          <IoCheckmarkDone size={32} />
        </button>
        <p
          className={
            (isCompleted
              ? "text-green-500 scale-125 visible "
              : " invisible ") + " duration-500 w-fit"
          }
        >
          Lesson Complete!
        </p>
      </div>
    </div>
  );
}
