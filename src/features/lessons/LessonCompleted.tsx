import { useEffect, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import {
  useGetUserProfileQuery,
  useUpdateLessonProgressMutation,
} from "../profile/profileSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";

import { useDebounce } from "use-debounce";

export default function LessonCompleted({ lessonID }: { lessonID: string }) {
  const user = useSelector(selectCurrentUser);

  if (!user) return null;

  const { data: profile } = useGetUserProfileQuery(null);
  const userLessonStatus = profile?.lessonStatus ?? [];

  const [updateLessonProgress] = useUpdateLessonProgressMutation();

  const lessonStatus = userLessonStatus.find(
    (item) => item.lessonID === lessonID
  );

  const [lessonCompleted, setLessonCompleted] = useState(
    lessonStatus?.status === "completed"
  );

  const [value] = useDebounce(lessonCompleted, 1000);

  const handleUpdate = async (status: string = "started") => {
    await updateLessonProgress({ status, lessonID });
  };

  useEffect(() => {
    setLessonCompleted(lessonStatus?.status === "completed");
    if (!lessonStatus) {
      // When lesson is opened set as started
      handleUpdate();
    }
  }, [lessonID, lessonStatus]);

  useEffect(() => {
    const checkScroll = () => {
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight
      ) {
        setLessonCompleted(true);
      } else {
        // setLessonCompleted(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (value === true) {
      handleUpdate("completed");
    }
  }, [value]);

  const isCompleted = lessonCompleted;

  return (
    <div className="flex flex-col items-center group">
      <div className="flex flex-row items-center justify-center gap-8 mt-20 mb-6">
        <button
          className={
            (isCompleted
              ? "border-green-600 text-green-600 bg-zinc-50"
              : "border-zinc-600 text-zinc-600") +
            " border-2 rounded-full p-2 bg-zinc-400 w-fit duration-500 hover:border-yellow-500 hover:text-yellow-500"
          }
          title="Mark Incomplete?"
          onClick={() => handleUpdate("started")}
        >
          <IoCheckmarkDone size={25} />
        </button>
        <p
          className={
            (isCompleted
              ? "text-green-600 scale-125 visible "
              : " invisible ") + " duration-500 w-fit"
          }
        >
          Lesson Completed!
        </p>
      </div>
    </div>
  );
}
