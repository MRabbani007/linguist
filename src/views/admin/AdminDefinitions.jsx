import React, { useState } from "react";
import Pagination from "../../features/components/Pagination";

export default function AdminDefinitions() {
  const [page, setPage] = useState(1);
  const count = 1;

  const content = null;

  return (
    <>
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%] text-nowrap">SN</span>
        <span className="w-[20%] text-nowrap">Title</span>
        <span className="w-[20%] text-nowrap">Sub-Title</span>
        <span className="w-[50%] text-nowrap">Detail</span>
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
