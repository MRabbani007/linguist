import React, { useEffect, useState } from "react";
import { useLazyGetAllSectionsQuery } from "../../features/admin/adminApiSlice";
import { useSelector } from "react-redux";
import Pagination from "../../features/components/Pagination";
import { selectSectionsCount } from "../../features/admin/adminSlice";

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
      <tr className="" key={id}>
        <th>{index + 1}</th>
        <th>{entities[id]?.title}</th>
        <th>{entities[id]?.subtitle}</th>
        <th>{entities[id]?.detail}</th>
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
