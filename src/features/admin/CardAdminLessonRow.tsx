import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function LessonRow({
  item,
  setEdit,
  setEditItem,
  page,
}: {
  item: Lesson;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Lesson | null>>;
  page: string;
}) {
  return (
    <div
      key={item.id}
      className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-1 border-b-[1px] border-zinc-200 group"
    >
      {/* <span className="w-[2%]">{(+page - 1) * 15 + index + 1}</span> */}
      <span className="w-[2%]">{item?.sortIndex}</span>
      <span className="flex-1 md:w-[20%]">{item?.title}</span>
      <span className="flex-1 md:w-[20%]">{item?.subtitle}</span>
      <span className="hidden md:inline-block md:flex-1">{item?.detail}</span>
      <span className="w-[10%]">{item?.state}</span>
      <span className="w-[15%] flex items-center justify-center gap-2">
        <button
          title="Edit"
          onClick={() => {
            setEdit(true);
            setEditItem(item);
          }}
          className="group-hover:bg-zinc-200 hover:bg-zinc-300 duration-150 p-1 rounded-md"
        >
          <CiEdit size={25} />
        </button>
        <Link
          to={`/admin/lessonEdit?id=${item.id}&p=${page}`}
          className="group-hover:bg-zinc-200 hover:bg-zinc-300 duration-150 p-1 rounded-md"
        >
          <IoOpenOutline size={25} />
        </Link>
      </span>
    </div>
  );
}
