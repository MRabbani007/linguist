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
  const [editItem, setEditItem] = useState(null);

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
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-2"
      >
        <span className="w-[5%]">{index + 1}</span>
        <span className="w-[20%]">{entities[id]?.title}</span>
        <span className="w-[20%]">{entities[id]?.subtitle}</span>
        <span className="w-[50%]">{entities[id]?.detail}</span>
        <span className="w-[5%]">
          <button
            title="Edit"
            onClick={() => {
              setEditItem(entities[id]);
              setEdit(true);
            }}
          >
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
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="w-[20%]">Title</span>
        <span className="w-[20%]">Sub-Title</span>
        <span className="w-[50%]">Detail</span>
        <span className="w-[5%]">Edit</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <button onClick={() => setAdd(true)} className="btn-r btn-red">
          Add Chapter
        </button>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
      {edit !== false && (
        <FormChapterEdit chapter={editItem} setEdit={setEdit} />
      )}
      {add && <FormChapterAdd setAdd={setAdd} />}
    </>
  );
}
