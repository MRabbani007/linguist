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
      <EditorChapterCard key={id} chapter={entities[id]} index={index} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <Pagination count={count} currentPage={page} setPage={setPage} />
      <table>
        <thead>
          <EditorChaptersHeader />
        </thead>
        <tbody>{isSuccess ? content : null}</tbody>
      </table>
      {isLoading || isError ? content : null}
      <Pagination count={count} currentPage={page} setPage={setPage} />
    </>
  );
}
