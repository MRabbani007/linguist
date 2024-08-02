import React, { useState } from "react";
import Pagination from "../../features/components/Pagination";

export default function AdminDefinitions() {
  const [page, setPage] = useState(1);
  const count = 1;

  const content = null;

  return (
    <main>
      <div className="flex items-center w-full p-4 bg-zinc-400 text-center">
        <span className="w-[5%] text-nowrap">SN</span>
        <span className="w-[20%] text-nowrap">Title</span>
        <span className="w-[20%] text-nowrap">Sub-Title</span>
        <span className="w-[50%] text-nowrap">Detail</span>
        <span className="w-[5%] text-nowrap">Edit</span>
      </div>
      <div className="flex-1 flex flex-col gap-2 py-2">{content}</div>
      <Pagination count={count} currentPage={page} setPage={setPage} />
    </main>
  );
}
