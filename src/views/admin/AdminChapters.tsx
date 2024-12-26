import { useEffect, useState } from "react";
import { useLazyGetAllChaptersQuery } from "../../features/admin/adminApiSlice";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";
import FormChapterEdit from "../../features/chapters/FormChapterEdit";
import FormChapterAdd from "../../features/chapters/FormChapterAdd";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { useLazyGetAdminChaptersQuery } from "@/features/chapters/chapterSlice";

export default function AdminChapters() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  let count = 0;

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [editItem, setEditItem] = useState<Chapter | null>(null);

  const [getAdminChapters, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAdminChaptersQuery();

  useEffect(() => {
    getAdminChapters(+page);
  }, [page]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item, index) => (
      <div
        key={item.id}
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-1 border-b-[1px] border-zinc-200"
      >
        <span className="w-[5%]">
          {(+page - 1) * ITEMS_PER_PAGE + index + 1}
        </span>
        <span className="w-[20%]">{item?.title}</span>
        <span className="w-[20%]">{item?.subtitle}</span>
        <span className="w-[50%]">{item?.detail}</span>
        <span className="w-[5%]">
          <button
            title="Edit"
            onClick={() => {
              setEditItem(item);
              setEdit(true);
            }}
          >
            <CiEdit size={28} />
          </button>
        </span>
      </div>
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="w-[20%]">Title</span>
        <span className="w-[20%]">Sub-Title</span>
        <span className="w-[50%]">Detail</span>
        <span className="w-[5%]">Edit</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <button onClick={() => setAdd(true)} className="btn-r btn-red">
          Add Chapter
        </button>
        <Pagination count={count} currentPage={+page} />
      </div>
      {edit !== false && editItem && (
        <FormChapterEdit chapter={editItem} setEdit={setEdit} />
      )}
      {add && <FormChapterAdd setAdd={setAdd} />}
    </>
  );
}
