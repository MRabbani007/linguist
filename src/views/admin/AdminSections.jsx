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
      <tr key={id}>
        <td className="py-2">{index + 1}</td>
        <td>{entities[id]?.title}</td>
        <td>{entities[id]?.subtitle}</td>
        <td>{entities[id]?.detail}</td>
        <td>
          <CiEdit size={20} />
        </td>
      </tr>
    ));
  }

  return (
    <>
      <table>
        <thead className="">
          <tr className="bg-zinc-200 rounded-lg overflow-clip">
            <th className="py-2">SN</th>
            <th>Title</th>
            <th>Sub-Title</th>
            <th>Detail</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
      <div className="flex items-center justify-between">
        <span></span>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
    </>
  );
}
