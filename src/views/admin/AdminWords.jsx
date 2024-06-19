import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectWordsCount } from "../../features/admin/adminSlice";
import { useLazyGetAllWordsQuery } from "../../features/admin/adminApiSlice";
import Pagination from "../../features/components/Pagination";

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
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{entities[id]?.first}</td>
        <td>{entities[id]?.second}</td>
        <td>{entities[id]?.third}</td>
        <td>{entities[id]?.fourth}</td>
        <td>{entities[id]?.image}</td>
        <td></td>
      </tr>
    ));
  }

  return (
    <>
      <Pagination count={count} currentPage={page} setPage={setPage} />
      <table>
        <thead>
          <tr>
            <td>SN</td>
            <td>First</td>
            <td>Second</td>
            <td>Third</td>
            <td>Fourth</td>
            <td>Image</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>{isSuccess ? content : null}</tbody>
      </table>
      {isLoading || isError ? content : null}
      <Pagination count={count} currentPage={page} setPage={setPage} />
    </>
  );
}
