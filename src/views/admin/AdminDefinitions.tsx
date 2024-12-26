import { useEffect, useState } from "react";
import Pagination from "../../features/components/Pagination";
import { useLazyGetAllDefinitionsQuery } from "../../features/admin/adminApiSlice";
import { CiEdit } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import FormDefinitionEdit from "@/features/definitions/FormDefinitionEdit";
import FormDefinitionAdd from "@/features/definitions/FormDefinitionAdd";

export default function AdminDefinitions() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  let count = 0;

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Definition | null>(null);

  const [getAllDefinitions, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAllDefinitionsQuery();

  useEffect(() => {
    getAllDefinitions(+page);
  }, [page]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item, index) => (
      <div
        key={item.id}
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-2"
      >
        <span className="w-[5%]">{(+page - 1) * 15 + index + 1}</span>
        <span className="w-[20%]">{item?.title}</span>
        <span className="flex-1">{item?.text}</span>
        <span className="w-[20%]">{item?.caption}</span>
        <span className="w-[5%]">
          <button
            title="Edit"
            onClick={() => {
              setEdit(true);
              setEditItem(item);
            }}
          >
            <CiEdit size={28} />
          </button>
        </span>
      </div>
    ));
  }

  return (
    <>
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%] text-nowrap">SN</span>
        <span className="w-[20%] text-nowrap">Title</span>
        <span className="flex-1 text-nowrap">Text</span>
        <span className="w-[20%] text-nowrap">Caption</span>
        <span className="w-[5%] text-nowrap">Edit</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <button className="btn-r btn-red" onClick={() => setAdd(true)}>
          Add Definition
        </button>
        <Pagination count={count} currentPage={+page} />
      </div>
      {add && <FormDefinitionAdd setAdd={setAdd} />}
      {edit && editItem && (
        <FormDefinitionEdit definition={editItem} setEdit={setEdit} />
      )}
    </>
  );
}
