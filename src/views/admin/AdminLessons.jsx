import React, { useEffect, useState } from "react";
import { useLazyGetAllLessonsQuery } from "../../features/admin/adminApiSlice";
import { useSelector } from "react-redux";
import {
  selectChapters,
  selectLessonsCount,
} from "../../features/admin/adminSlice";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";
import FormLessonEdit from "../../features/blocks/FormLessonEdit";
import FormLessonAdd from "../../features/blocks/FormLessonAdd";

export default function AdminLessons() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectLessonsCount);
  const chapters = useSelector(selectChapters);

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const [chapter, setChapter] = useState("");

  const [getAllLessons, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAllLessonsQuery();

  useEffect(() => {
    getAllLessons({ page, chapter });
  }, [page]);

  useEffect(() => {
    setPage(1);
    getAllLessons({ page, chapter });
  }, [chapter]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    const { ids, entities } = data;
    content = ids.map((id, index) => (
      <div
        key={id}
        className="flex items-center flex-1 text-center bg-zinc-200 p-2"
      >
        <span className="w-[5%]">{(page - 1) * 15 + index + 1}</span>
        <span className="w-[5%]">{entities[id]?.lessonNo}</span>
        <span className="w-[5%]">{entities[id]?.sortIndex}</span>
        <span className="w-[20%]">{entities[id]?.title}</span>
        <span className="w-[20%]">{entities[id]?.subtitle}</span>
        <span className="flex-1">{entities[id]?.detail}</span>
        <span className="w-[5%]">
          <button title="Edit" onClick={() => setEdit(entities[id])}>
            <CiEdit size={28} />
          </button>
        </span>
      </div>
    ));
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <div className="field">
          <select
            name="chapter"
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          >
            <option value="">Select Chapter</option>
            {chapters.map((item) => (
              <option value={item.id}>{item.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="flex items-center flex-1 p-4 bg-zinc-400 text-center font-semibold">
          <span className="w-[5%]">SN</span>
          <span className="w-[5%]">Lesson No</span>
          <span className="w-[5%]">Sort Index</span>
          <span className="w-[20%]">Title</span>
          <span className="w-[20%]">Sub-Title</span>
          <span className="flex-1">Detail</span>
          <span className="w-[5%]">Edit</span>
        </div>
        <div className="flex flex-col gap-2 py-2">{content}</div>
        <div className="p-4 flex items-center justify-between bg-zinc-400">
          <button className="btn btn-yellow" onClick={() => setAdd(true)}>
            Add Lesson
          </button>
          <Pagination count={count} currentPage={page} setPage={setPage} />
        </div>
      </div>
      {edit !== false ? (
        <FormLessonEdit lesson={edit} setEdit={setEdit} />
      ) : null}
      {add ? <FormLessonAdd setAdd={setAdd} /> : null}
    </>
  );
}
