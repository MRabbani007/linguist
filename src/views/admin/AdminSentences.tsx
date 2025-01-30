import AdminSentenceContainer from "@/features/admin/AdminSentenceContainer";
import Pagination from "@/features/components/Pagination";
import { selectLessons, selectSections } from "@/features/globals/globalsSlice";
import FormBulkMove from "@/features/sentences/FormBulkMove";
import FormSentenceEdit from "@/features/sentences/FormSentenceEdit";
import FormSentenceFilter from "@/features/sentences/FormSentenceFilter";
import FormSentenceMove from "@/features/sentences/FormSentenceMove";
import Sentence from "@/features/sentences/Sentence";
import { useLazyGetAdminSentencesQuery } from "@/features/sentences/sentencesSlice";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { FormEvent, useEffect, useState } from "react";
import { BiCollapse, BiExpand, BiFilter, BiX } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
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

  const lessons = useSelector(selectLessons);
  const sections = useSelector(selectSections);

  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? "1";
  const level = searchParams.get("level") ?? "";
  const lessonID = searchParams.get("lessonID") ?? "";
  let count = 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(false);
  const [move, setMove] = useState(false);

  const [bulkMove, setBulkMove] = useState(false);
  const [selectedSentences, setSelectedSentences] = useState<string[]>([]);

  const [editItem, setEditItem] = useState<Sentence | null>(null);

  const [showFilter, setShowFilter] = useState(false);
  const [display, setDisplay] = useState("condensed");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate({
        pathname: "/sentences",
        search: `${createSearchParams({ search: searchTerm })}`,
      });
    }
  };

  const handleSelectSentence = (id: string) => {
    const index = selectedSentences.findIndex((item) => item === id);
    if (index >= 0) {
      const temp = [...selectedSentences];
      temp.splice(index, 1);
      setSelectedSentences(temp);
    } else {
      setSelectedSentences((curr) => [...curr, id]);
    }
  };

  const handleClear = () => {
    if (confirm("Clear selected sentences?")) {
      setSelectedSentences([]);
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
          lesson={lessons?.find((lesson) => lesson.id === item.lessonID)}
          section={sections?.find((sec) => sec.id === item.sectionID)}
          setEdit={setEdit}
          setEditItem={setEditItem}
          handleSelectSentence={handleSelectSentence}
          selected={
            selectedSentences.findIndex((id) => id === item.id) >= 0
              ? true
              : false
          }
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
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <p>
          {isSuccess
            ? `${(+page - 1) * ITEMS_PER_PAGE + 1} to ${
                +page * ITEMS_PER_PAGE
              } of ${count}` + " results"
            : null}
        </p>
        <div className="flex items-center">
          <button onClick={() => setBulkMove(true)}>
            {selectedSentences?.length === 1
              ? `1 Sentence`
              : `${selectedSentences?.length} Sentences`}
          </button>
          <button onClick={handleClear}>
            <BiX size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowFilter(true)}
          className="p-1 bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-md"
        >
          <BiFilter size={25} />
        </button>
        <button
          className="p-1 bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-md"
          onClick={() =>
            setDisplay((curr) => (curr === "condensed" ? "" : "condensed"))
          }
        >
          {display === "condensed" ? (
            <BiExpand size={20} />
          ) : (
            <BiCollapse size={20} />
          )}
        </button>
        <Pagination currentPage={+page} count={count} className="ml-auto" />
      </div>
      <div className="w-full flex flex-col gap-4">{content}</div>
      <Pagination currentPage={+page} count={count} />
      {showFilter && (
        <FormSentenceFilter
          setShowForm={setShowFilter}
          levelInit={level ?? ""}
          lessonIDInit={lessonID ?? ""}
        />
      )}
      {edit && editItem && (
        <FormSentenceEdit sentence={editItem} setEdit={setEdit} />
      )}
      {move && editItem && (
        <FormSentenceMove sentence={editItem} setEdit={setMove} />
      )}
      {bulkMove && (
        <FormBulkMove
          sentences={selectedSentences}
          setEdit={setBulkMove}
          setSelected={setSelectedSentences}
        />
      )}
    </>
  );
}
