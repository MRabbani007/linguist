import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectWordsCount } from "../../features/admin/adminSlice";
import { useLazyGetAllWordsQuery } from "../../features/admin/adminApiSlice";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";

export default function AdminWords() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectWordsCount);

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
        className="flex items-center flex-1 text-center bg-zinc-200 py-2 px-1"
      >
        <span className="w-[5%]">{(page - 1) * 15 + index + 1}</span>
        <span className="w-[10%] overflow-hidden text-nowrap">
          {entities[id]?.blockID}
        </span>
        <span className="w-[10%]">{entities[id]?.first}</span>
        <span className="w-[10%]">{entities[id]?.second}</span>
        <span className="w-[10%]">{entities[id]?.third}</span>
        <span className="w-[10%]">{entities[id]?.fourth}</span>
        <span className="w-[10%]">{entities[id]?.type}</span>
        <span className="w-[10%]">{entities[id]?.gender}</span>
        <span className="flex-1">{entities[id]?.image}</span>
        <span className="w-[5%]">
          <CiEdit size={28} />
        </span>
      </div>
    ));
  }

  return (
    <>
      <div className="flex-1 w-full">
        <div className="flex items-center flex-1 py-4 px-2 bg-zinc-400 text-center">
          <span className="w-[5%]">SN</span>
          <span className="w-[10%]">Lesson</span>
          <span className="w-[10%]">First</span>
          <span className="w-[10%]">Second</span>
          <span className="w-[10%]">Third</span>
          <span className="w-[10%]">Fourth</span>
          <span className="w-[10%]">Type</span>
          <span className="w-[10%]">Gender</span>
          <span className="flex-1">Image</span>
          <span className="w-[5%]">Edit</span>
        </div>
        <div className="flex flex-col gap-2 py-2">{content}</div>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
    </>
  );
}
