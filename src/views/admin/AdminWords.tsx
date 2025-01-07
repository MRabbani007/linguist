import { useEffect, useState } from "react";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";
import FormWordEdit from "../../features/words/FormWordEdit";
import { useFetchAttributes } from "../../hooks/useFetchAttributes";
import { useSearchParams } from "react-router-dom";
import { useLazyGetWordsQuery } from "../../features/words/wordsSlice";

export default function AdminWords() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  let count = 0;

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Word | null>(null);

  const [getWords, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetWordsQuery();

  const [attributes] = useFetchAttributes();

  useEffect(() => {
    getWords(+page);
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
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-1 border-b-[1px] border-zinc-200"
      >
        <p className="w-[5%]">{(+page - 1) * 15 + index + 1}</p>
        <div className="w-[15%]">
          <p title="Word">{item?.first}</p>
          <p title="Translation">{item?.second}</p>
        </div>
        <div className="w-[15%]">
          <p title="Pronounced">{item?.third}</p>
          <p title="Other">{item?.fourth}</p>
        </div>
        <div className="w-[15%]">
          <p title="Type">{item?.type}</p>
          <p title="Gender">{item?.gender}</p>
        </div>
        <div className="w-[15%]">
          <p>{item?.subject}</p>
          <p>{item?.level}</p>
        </div>
        <div className="flex-1">
          <p>{item?.image}</p>
          <p>{item?.imageURL?.substr(0, 20)}</p>
        </div>
        <div className="w-[5%]">
          <button
            onClick={() => {
              setEditItem(item);
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
        <Pagination count={count} currentPage={+page} />
      </div>
      {edit && editItem && (
        <FormWordEdit
          word={editItem}
          setViewEdit={setEdit}
          sections={[]}
          attributes={attributes as WordAttribute[]}
        />
      )}
    </>
  );
}
