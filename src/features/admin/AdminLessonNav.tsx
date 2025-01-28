import { ReactNode, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useLazyGetAdminLessonsQuery } from "../lessons/lessonSlice";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export default function AdminLessonNav({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();

  const [getAdminLessons, { data, isSuccess, isLoading }] =
    useLazyGetAdminLessonsQuery();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const page = searchParams.get("p") ?? "1";
  const direction = searchParams.get("dir") ?? "";

  useEffect(() => {
    getAdminLessons({ page });
  }, [page]);

  useEffect(() => {
    console.log(id, direction, page);
    if (id === "" && direction === "next" && isSuccess && !isLoading) {
      navigate({
        pathname: "/admin/lessonEdit",
        search: `${createSearchParams({
          id: data?.data[0]?.id ?? "",
          p: page,
        })}`,
      });
    }
    if (id === "" && direction === "prev" && isSuccess && !isLoading) {
      navigate({
        pathname: "/admin/lessonEdit",
        search: `${createSearchParams({
          id: data?.data[data?.data.length - 1]?.id ?? "",
          p: page,
        })}`,
      });
    }
  }, [data]);

  const handlePrevious = () => {
    if (isFirstPage && firstLesson) {
      // first page first lesson
      // disabled
    } else if (lessonIndex === 0) {
      // first lesson not first page
      // move page
      navigate({
        pathname: "/admin/lessonEdit",
        search: `${createSearchParams({
          id: "",
          p: (parseInt(page) - 1).toString(),
          dir: "prev",
        })}`,
      });
    } else {
      navigate({
        pathname: "/admin/lessonEdit",
        search: `${createSearchParams({
          id: data?.data[lessonIndex - 1]?.id ?? "",
          p: page,
        })}`,
      });
    }
  };

  const handleNext = () => {
    if (isLastPage && lastLesson) {
      // disabled
    } else if (lastLesson) {
      // move page
      navigate({
        pathname: "/admin/lessonEdit",
        search: `${createSearchParams({
          id: "",
          p: (parseInt(page) + 1).toString(),
          dir: "next",
        })}`,
      });
    } else {
      // move to next lesson
      navigate({
        pathname: "/admin/lessonEdit",
        search: `${createSearchParams({
          id: data?.data[lessonIndex + 1]?.id ?? "",
          p: page,
        })}`,
      });
    }
  };

  const [lessonIndex, setLessonIndex] = useState(-1);

  useEffect(() => {
    if (id && id !== "") {
      setLessonIndex(data?.data.findIndex((item) => item.id === id) ?? -1);
    }
  }, [id, data]);

  const firstLesson = lessonIndex === 0;
  const lastLesson = lessonIndex === (data?.data.length ?? 0) - 1;

  const isFirstPage = +page === 1;
  const isLastPage = +page === (data?.count ?? 0 / ITEMS_PER_PAGE);

  return (
    <div className="p-2 md:p-4 flex justify-between items-center ">
      <button
        onClick={handlePrevious}
        disabled={firstLesson && isFirstPage}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200"
      >
        <FaArrowLeft size={25} />
        <span className="font-semibold hidden md:inline text-nowrap">
          {firstLesson ? "Previous Lesson" : "Previous Lesson"}
        </span>
      </button>
      {children}
      <button
        onClick={handleNext}
        disabled={lastLesson && isLastPage}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200"
      >
        <span className="font-semibold hidden md:inline duration-200 text-nowrap">
          {lastLesson ? "Next Lesson" : "Next Lesson"}
        </span>
        <FaArrowRight size={25} />
      </button>
    </div>
  );
}
