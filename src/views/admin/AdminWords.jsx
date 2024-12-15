import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectWordsCount } from "../../features/admin/adminSlice";
import { useLazyGetAllWordsQuery } from "../../features/admin/adminApiSlice";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";
import FormWordEdit from "../../features/words/FormWordEdit";

export default function AdminWords() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectWordsCount);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [getAllWords, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAllWordsQuery();

  useEffect(() => {
    getAllWords(page);
  }, [page]);

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
        <span className="w-[5%]">{(page - 1) * 15 + index + 1}</span>
        <span className="w-[10%]">{entities[id]?.first}</span>
        <span className="w-[10%]">{entities[id]?.second}</span>
        <span className="w-[10%]">{entities[id]?.third}</span>
        <span className="w-[10%]">{entities[id]?.fourth}</span>
        <span className="w-[10%]">{entities[id]?.type}</span>
        <span className="w-[10%]">{entities[id]?.gender}</span>
        <span className="flex-1">{entities[id]?.image}</span>
        <span className="w-[5%]">
          <button
            onClick={() => {
              setEditItem(entities[id]);
              setEdit(true);
            }}
          >
            <CiEdit size={20} />
          </button>
        </span>
      </div>
    ));
  }

  return (
    <>
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="w-[10%]">First</span>
        <span className="w-[10%]">Second</span>
        <span className="w-[10%]">Third</span>
        <span className="w-[10%]">Fourth</span>
        <span className="w-[10%]">Type</span>
        <span className="w-[10%]">Gender</span>
        <span className="flex-1">Image</span>
        <span className="w-[5%]">Edit</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <span></span>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
      {edit && <FormWordEdit word={editItem} setViewEdit={setEdit} />}
    </>
  );
}
