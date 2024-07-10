import React, { useState } from "react";
import Pagination from "../../features/components/Pagination";

export default function AdminDefinitions() {
  const [page, setPage] = useState(1);
  const count = 1;

  const content = null;

  return (
    <main>
      <div className="flex-1 w-full">
        <div className="flex items-center flex-1 p-4 bg-zinc-400 text-center">
          <span className="w-[5%]">SN</span>
          <span className="w-[20%]">Title</span>
          <span className="w-[20%]">Sub-Title</span>
          <span className="w-[50%]">Detail</span>
          <span className="w-[5%]">Edit</span>
        </div>
        <div className="flex flex-col gap-2 py-2">{content}</div>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
    </main>
  );
}
