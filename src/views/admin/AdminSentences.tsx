import AdminSentenceContainer from "@/features/admin/AdminSentenceContainer";
import Pagination from "@/features/components/Pagination";
import FormSentenceEdit from "@/features/sentences/FormSentenceEdit";
import FormSentenceMove from "@/features/sentences/FormSentenceMove";
import Sentence from "@/features/sentences/Sentence";
import { useLazyGetAdminSentencesQuery } from "@/features/sentences/sentencesSlice";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { FormEvent, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function AdminSentences() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchSentences, { data, isLoading, isSuccess, isError }] =
    useLazyGetAdminSentencesQuery();

  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? "1";
  const lessonID = searchParams.get("lessonID") ?? "";
  let count = 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(false);
  const [move, setMove] = useState(false);
  const [editItem, setEditItem] = useState<Sentence | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate({
        pathname: "/sentences",
        search: `${createSearchParams({ search: searchTerm })}`,
      });
    }
  };

  useEffect(() => {
    // if (searchTerm !== "" || (lessonID && lessonID !== "")) {
    searchSentences({ searchTerm: search, lessonID, page: +page });
  }, [search, lessonID, page]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item: Sentence) => {
      return (
        <AdminSentenceContainer
          key={item.id}
          setMove={setMove}
          sentence={item}
          setEdit={setEdit}
          setEditItem={setEditItem}
        >
          <Sentence sentence={item} />
        </AdminSentenceContainer>
      );
    });
  } else if (isError) {
    content = <p>Error Loading Sentences</p>;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2 bg-zinc-400/10 py-2 px-4 rounded-md"
      >
        <input
          type="text"
          title="Search sentences"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent flex-1"
        />
        <button type="submit">
          <IoSearchOutline size={32} />
        </button>
      </form>
      <p>
        {isSuccess
          ? `${(+page - 1) * ITEMS_PER_PAGE + 1} to ${
              +page * ITEMS_PER_PAGE
            } of ${count}` + " results"
          : null}
      </p>
      <Pagination currentPage={+page} count={count} />
      <div className="w-full flex flex-col gap-4">{content}</div>
      <Pagination currentPage={+page} count={count} />
      {edit && editItem && (
        <FormSentenceEdit sentence={editItem} setEdit={setEdit} />
      )}
      {move && editItem && (
        <FormSentenceMove sentence={editItem} setEdit={setMove} />
      )}
    </>
  );
}
