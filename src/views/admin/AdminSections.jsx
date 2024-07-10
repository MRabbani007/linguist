import React, { useEffect, useState } from "react";
import { useLazyGetAllSectionsQuery } from "../../features/admin/adminApiSlice";
import { useSelector } from "react-redux";
import Pagination from "../../features/components/Pagination";
import { selectSectionsCount } from "../../features/admin/adminSlice";
import { CiEdit } from "react-icons/ci";

export default function AdminSections() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectSectionsCount);

  const [getAllSections, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAllSectionsQuery();

  useEffect(() => {
    getAllSections(page);
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
        className="flex items-center flex-1 text-center bg-zinc-200 p-2"
      >
        <span className="w-[5%]">{index + 1}</span>
        <span className="w-[20%]">{entities[id]?.title}</span>
        <span className="w-[20%]">{entities[id]?.subtitle}</span>
        <span className="w-[50%]">{entities[id]?.detail}</span>
        <span className="w-[5%]">
          <CiEdit size={28} />
        </span>
      </div>
    ));
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
        <div>
          <Pagination count={count} currentPage={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
