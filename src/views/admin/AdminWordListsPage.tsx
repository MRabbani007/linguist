import Pagination from "@/components/Pagination";
import { useLazyGetAdminWordListsQuery } from "@/features/admin/adminApiSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AdminWordListsPage() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  let count = 0;

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [editItem, setEditItem] = useState<Chapter | null>(null);

  const [getAdminWordLists, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAdminWordListsQuery();

  useEffect(() => {
    getAdminWordLists(+page);
  }, [page]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item, index) => (
      <div key={index}>{item.name}</div>
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <div className="flex-1 flex flex-col gap-4">{content}</div>
      <div className="flex items-center justify-between">
        <button onClick={() => setAdd(true)} className="btn-r btn-red">
          Create List
        </button>
        <Pagination count={count} currentPage={+page} />
      </div>
    </>
  );
}
