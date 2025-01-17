import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";
import FormLessonEdit from "../../features/lessons/FormLessonEdit";
import FormLessonAdd from "../../features/lessons/FormLessonAdd";
import { selectChapters } from "../../features/globals/globalsSlice";
import { Link, useSearchParams } from "react-router-dom";
import { useLazyGetAdminLessonsQuery } from "@/features/lessons/lessonSlice";
import { IoOpenOutline } from "react-icons/io5";

export default function AdminLessons() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  let count = 0;

  const chapters = useSelector(selectChapters);

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const [editItem, setEditItem] = useState<Lesson | null>(null);

  const [chapter, setChapter] = useState("");

  const [getAllLessons, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAdminLessonsQuery();

  useEffect(() => {
    getAllLessons({ page, chapter });
  }, [page]);

  useEffect(() => {
    getAllLessons({ page, chapter });
  }, [chapter]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item, index) => (
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
    ));
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <select
          name="chapter"
          id="chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        >
          <option value="">Select Chapter</option>
          {chapters.map((item, idx) => (
            <option key={idx} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center p-2 text-center border-2 border-zinc-200">
          <span className="w-[2%]" title="Serial Number">
            #
          </span>
          <span className="flex-1 md:w-[20%]" title="Lesson Title">
            Title
          </span>
          <span className="flex-1 md:w-[20%]" title="Lesson Sub-title">
            Sub-Title
          </span>
          <span
            className="hidden md:inline-block md:flex-1"
            title="Lesson Detail"
          >
            Detail
          </span>
          <span className="w-[10%]">Status</span>
          <span className="w-[15%] text-center" title="Edit Lesson">
            Edit
          </span>
        </div>
        <div className="flex-1">{content}</div>
      </div>
      <div className="flex items-center justify-between">
        <button className="btn-r btn-red" onClick={() => setAdd(true)}>
          Add Lesson
        </button>
        <Pagination count={count} currentPage={+page} />
      </div>
      {edit === true && editItem && (
        <FormLessonEdit lesson={editItem} setEdit={setEdit} />
      )}
      {add && <FormLessonAdd setAdd={setAdd} />}
    </>
  );
}
