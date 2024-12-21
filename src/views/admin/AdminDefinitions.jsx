import React, { useEffect, useState } from "react";
import Pagination from "../../features/components/Pagination";
import { useLazyGetAllDefinitionsQuery } from "../../features/admin/adminApiSlice";
import { CiEdit } from "react-icons/ci";

export default function AdminDefinitions() {
  const [page, setPage] = useState(1);
  const count = 1;

  const [getAllDefinitions, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAllDefinitionsQuery();

  useEffect(() => {
    getAllDefinitions(page);
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
        <span className="w-[20%]">{entities[id]?.title}</span>
        <span className="flex-1">{entities[id]?.text}</span>
        <span className="w-[20%]">{entities[id]?.caption}</span>
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
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%] text-nowrap">SN</span>
        <span className="w-[20%] text-nowrap">Title</span>
        <span className="flex-1 text-nowrap">Text</span>
        <span className="w-[20%] text-nowrap">Caption</span>
        <span className="w-[5%] text-nowrap">Edit</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <span></span>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
    </>
  );
}
