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
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-2"
      >
        <span className="w-[2%]">{(page - 1) * 15 + index + 1}</span>
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
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[2%]" title="Serial Number">
          #
        </span>
        <span className="w-[5%]" title="Lesson Number">
          LN
        </span>
        <span className="w-[5%]" title="Sort Index">
          SI
        </span>
        <span className="w-[20%]" title="Lesson Title">
          Title
        </span>
        <span className="w-[20%]" title="Lesson Sub-title">
          Sub-Title
        </span>
        <span className="flex-1" title="Lesson Detail">
          Detail
        </span>
        <span className="w-[5%]" title="Edit Lesson">
          Edit
        </span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <button className="btn-r btn-red" onClick={() => setAdd(true)}>
          Add Lesson
        </button>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
      {edit !== false ? (
        <FormLessonEdit lesson={edit} setEdit={setEdit} />
      ) : null}
      {add ? <FormLessonAdd setAdd={setAdd} /> : null}
    </>
  );
}
