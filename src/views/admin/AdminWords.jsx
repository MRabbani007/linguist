import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectWordsCount } from "../../features/admin/adminSlice";
import { useLazyGetAllWordsQuery } from "../../features/admin/adminApiSlice";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";
import FormWordEdit from "../../features/words/FormWordEdit";

export default function AdminWords() {
  const [page, setPage] = useState(1);
  const count = useSelector(selectWordsCount);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

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
      <div
        key={id}
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-1 border-b-[1px] border-zinc-200"
      >
        <p className="w-[5%]">{(page - 1) * 15 + index + 1}</p>
        <div className="w-[15%]">
          <p title="Word">{entities[id]?.first}</p>
          <p title="Translation">{entities[id]?.second}</p>
        </div>
        <div className="w-[15%]">
          <p title="Pronounced">{entities[id]?.third}</p>
          <p title="Other">{entities[id]?.fourth}</p>
        </div>
        <div className="w-[15%]">
          <p title="Type">{entities[id]?.type}</p>
          <p title="Gender">{entities[id]?.gender}</p>
        </div>
        <div className="w-[15%]">
          <p>{entities[id]?.subject}</p>
          <p>{entities[id]?.level}</p>
        </div>
        <div className="flex-1">
          <p>{entities[id]?.image}</p>
          <p>{entities[id]?.imageURL?.substr(0, 20)}</p>
        </div>
        <div className="w-[5%]">
          <button
            onClick={() => {
              setEditItem(entities[id]);
              setEdit(true);
            }}
          >
            <CiEdit size={20} />
          </button>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="w-[15%]">Word / Translation</span>
        <span className="w-[15%]">Pronounce / Other</span>
        <span className="w-[15%]">Type / Gender</span>
        <span className="w-[15%]">Subject / Level</span>
        <span className="flex-1">Image</span>
        <span className="w-[5%]">Edit</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <span></span>
        <Pagination count={count} currentPage={page} setPage={setPage} />
      </div>
      {edit && <FormWordEdit word={editItem} setViewEdit={setEdit} />}
    </>
  );
}
