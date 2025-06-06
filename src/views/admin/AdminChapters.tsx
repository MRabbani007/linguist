import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { CiEdit } from "react-icons/ci";
import FormChapterEdit from "../../features/chapters/FormChapterEdit";
import FormChapterAdd from "../../features/chapters/FormChapterAdd";
import { useSearchParams } from "react-router-dom";
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
    content = data.data.map((item) => (
      <CardChapter
        chapter={item}
        key={item.id}
        setEdit={setEdit}
        setEditItem={setEditItem}
      />
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      {/* <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="w-[20%]">Title</span>
        <span className="w-[20%]">Sub-Title</span>
        <span className="w-[50%]">Detail</span>
        <span className="w-[5%]">Edit</span>
      </div> */}
      <div className="flex-1 flex flex-col gap-4">{content}</div>
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

function CardChapter({
  chapter,
  setEdit,
  setEditItem,
}: {
  chapter: Chapter;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Chapter | null>>;
}) {
  return (
    <div className="bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-md p-2 relative">
      <div className="flex items-start gap-2">
        <p className="bg-red-600 p-0 text-sm rounded-md text-white w-6 h-6 flex items-center justify-center">
          {chapter.chapterNo}
        </p>
        <div>
          <p
            className="text-lg font-medium h-6 flex items-center cursor-pointer"
            onClick={() => {
              setEditItem(chapter);
              setEdit(true);
            }}
          >
            {chapter.title}
          </p>
          <p className="text-sm -mt-1">{chapter.subtitle}</p>
        </div>
      </div>
      <div className="pl-8 py-2 text-sm">{chapter.detail}</div>
      {/* <button
        title="Edit"
        onClick={() => {
          setEditItem(chapter);
          setEdit(true);
        }}
        className="absolute top-2 right-2"
      >
        <CiEdit size={20} /> 
      </button>*/}
    </div>
  );
}

function ChapterRow({
  chapter,
  setEdit,
  setEditItem,
}: {
  chapter: Chapter;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Chapter | null>>;
}) {
  return (
    <div
      key={chapter.id}
      className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-1 border-b-[1px] border-zinc-200"
    >
      <span className="w-[5%]">
        {/* {(+page - 1) * ITEMS_PER_PAGE + index + 1} */}
        {chapter.chapterNo}
      </span>
      <span className="w-[20%]">{chapter?.title}</span>
      <span className="w-[20%]">{chapter?.subtitle}</span>
      <span className="w-[50%]">{chapter?.detail}</span>
      <span className="w-[5%]">
        <button
          title="Edit"
          onClick={() => {
            setEditItem(chapter);
            setEdit(true);
          }}
        >
          <CiEdit size={28} />
        </button>
      </span>
    </div>
  );
}
