import React, { useEffect, useState } from "react";
import EditorChapterCard from "../../features/editor/EditorChapterCard";
import EditorChaptersHeader from "../../features/editor/EditorChaptersHeader";
import { useLazyGetAllChaptersQuery } from "../../features/admin/adminApiSlice";
import Pagination from "../../features/components/Pagination";
import { useSelector } from "react-redux";
import { selectChaptersCount } from "../../features/admin/adminSlice";

export default function AdminChapters() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectChaptersCount);

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
      // <EditorChapterCard key={id} chapter={entities[id]} index={index} />
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{entities[id]?.title}</td>
        <td>{entities[id]?.subtitle}</td>
        <td>{entities[id]?.detail}</td>
      </tr>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <div>
        <Pagination count={count} currentPage={page} setPage={setPage} />
        <table className="max-w-[1024px] border-none">
          <thead className="bg-red-500 text-white">
            <tr className="">
              <th>SN</th>
              <th>Title</th>
              <th>Sub-Title</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>{isSuccess ? content : null}</tbody>
        </table>
        {isLoading || isError ? content : null}
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
    </main>
  );
}
