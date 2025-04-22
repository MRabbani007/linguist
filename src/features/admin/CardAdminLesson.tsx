import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function CardAdminLesson({
  lesson,
  setEdit,
  setEditItem,
  page,
}: {
  lesson: Lesson;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Lesson | null>>;
  page: string;
}) {
  return (
    <div className="flex gap-2 bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-md p-2 relative">
      <p className="bg-red-600 p-0 text-sm rounded-md text-white w-8 h-8 flex items-center justify-center">
        {lesson.sortIndex}
      </p>
      <div className="flex-1 flex flex-col gap-1">
        <Link
          to={`/admin/lessonEdit?id=${lesson.id}&p=${page}`}
          className="text-lg font-medium h-8 flex items-center cursor-pointer"
        >
          {lesson.title}
        </Link>
        {lesson?.subtitle !== "" && (
          <p className="text-sm -mt-1">{lesson.subtitle}</p>
        )}
        {lesson?.detail !== "" && (
          <p className="pl-8 py-2 text-sm">{lesson.detail}</p>
        )}
      </div>
      <button
        onClick={() => {
          setEditItem(lesson);
          setEdit(true);
        }}
        className="group-hover:bg-zinc-200 hover:bg-zinc-300 duration-150 p-1 rounded-md"
      >
        <CiEdit size={20} />
      </button>
    </div>
  );
}
