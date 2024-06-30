import React, { useEffect, useState } from "react";
import EditorBlocksHeader from "../../features/editor/EditorBlocksHeader";
import EditorBlockTitle from "../../features/editor/EditorBlockTitle";
import { useLazyGetAllLessonsQuery } from "../../features/admin/adminApiSlice";
import { useSelector } from "react-redux";
import { selectLessonsCount } from "../../features/admin/adminSlice";
import Pagination from "../../features/components/Pagination";

export default function AdminLessons() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectLessonsCount);

  const [getAllLessons, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAllLessonsQuery();

  useEffect(() => {
    getAllLessons(page);
  }, [page]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    const { ids, entities } = data;
    content = ids.map((id, index) => (
      // <EditorBlockTitle key={id} block={entities[id]} index={index} />
      <tr className="" key={id}>
        <td>{index + 1}</td>
        <td>{entities[id]?.title}</td>
        <td>{entities[id]?.subtitle}</td>
        <td>{entities[id]?.detail}</td>
      </tr>
    ));
  }

  return (
    <>
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
    </>
  );
}
