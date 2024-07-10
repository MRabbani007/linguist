import React, { useEffect, useState } from "react";
import { useLazyGetAllChaptersQuery } from "../../features/admin/adminApiSlice";
import Pagination from "../../features/components/Pagination";
import { useSelector } from "react-redux";
import { selectChaptersCount } from "../../features/admin/adminSlice";
import { CiEdit } from "react-icons/ci";
import FormChapterEdit from "../../features/chapters/FormChapterEdit";
import FormChapterAdd from "../../features/chapters/FormChapterAdd";

export default function AdminChapters() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectChaptersCount);

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const [getAllChapters, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAllChaptersQuery();

  useEffect(() => {
    getAllChapters(page);
  }, [page]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = data;
    content = ids.map((id, index) => (
      <div
        key={id}
        className="flex items-center flex-1 text-center bg-zinc-200 p-2"
      >
        <span className="w-[5%]">{index + 1}</span>
        <span className="w-[20%]">{entities[id]?.title}</span>
        <span className="w-[20%]">{entities[id]?.subtitle}</span>
        <span className="w-[50%]">{entities[id]?.detail}</span>
        <span className="w-[5%]">
          <button title="Edit" onClick={() => setEdit(entities[id])}>
            <CiEdit size={28} />
          </button>
        </span>
      </div>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <div className="flex-1 w-full">
        <div className="flex items-center flex-1 p-4 bg-zinc-400 text-center">
          <span className="w-[5%]">SN</span>
          <span className="w-[20%]">Title</span>
          <span className="w-[20%]">Sub-Title</span>
          <span className="w-[50%]">Detail</span>
          <span className="w-[5%]">Edit</span>
        </div>
        <div className="flex flex-col gap-2 py-2">{content}</div>
        <div className="p-4 flex items-center justify-between bg-zinc-400">
          <button onClick={() => setAdd(true)} className="btn btn-red">
            Add Chapter
          </button>
          <Pagination count={count} currentPage={page} setPage={setPage} />
        </div>
      </div>
      {edit !== false ? (
        <FormChapterEdit chapter={edit} setEdit={setEdit} />
      ) : null}
      {add ? <FormChapterAdd setAdd={setAdd} /> : null}
    </>
  );
}
