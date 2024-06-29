import React, { useEffect, useState } from "react";
import {
  useLazyGetSentencesAllQuery,
  useLazyGetSentencesQuery,
} from "../../features/sentences/sentencesSlice";
import Sentence from "../../features/sentences/Sentence";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectEditMode,
  selectSentenceCount,
} from "../../features/globals/globalsSlice";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "use-debounce";
import { FaPlus } from "react-icons/fa6";
import FormSentenceAdd from "../../features/sentences/FormSentenceAdd";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import Pagination from "../../features/components/Pagination";
import ReactLoading from "react-loading";
import FilterSentences from "../../features/sentences/FilterSentences";
import SortSentences from "../../features/sentences/SortSentences";
import { toast } from "react-toastify";

const SENTENCE_SORT = [
  "createDate",
  "translation",
  "level",
  "baseWordTranslation",
  "lessonID",
];

const sortFunction = (type, payload) => {
  switch (type) {
    case "createDate": {
    }
    case "translation": {
    }
    case "level": {
    }
    case "difficulty": {
    }
    case "baseWordT": {
    }
    default: {
      return payload;
    }
  }
};

const filterFunction = (filters, payload) => {
  let result = payload;
  if (filters.includes("lesson")) {
  }
  return result;
};

export default function SentencesPage() {
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const { lessonID } = useParams();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const count = useSelector(selectSentenceCount);
  const [sentences, setSentences] = useState([]);

  const [getSentencesAll, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetSentencesAllQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    getSentencesAll({ searchTerm: search, lessonID, page });
  };

  useEffect(() => {
    setPage(1);
    getSentencesAll({ searchTerm: value, lessonID, page: 1, ...sort });
  }, [value, sort]);

  useEffect(() => {
    getSentencesAll({ searchTerm: value, lessonID, page, ...sort });
  }, [page]);

  useEffect(() => {
    if (Array.isArray(data?.ids)) {
      setSentences(data.ids.map((id) => data.entities[id]));
    }
  }, [data, isSuccess]);

  let content = "";
  if (isLoading) {
    content = (
      <ReactLoading
        type={"bubbles"}
        color={"#000"}
        height={"10%"}
        width={"10%"}
        className="mx-auto"
      />
    );
  } else if (isSuccess) {
    content = sentences.map((sentence) => {
      return <Sentence sentence={sentence} key={sentence?.id} />;
    });
  } else if (isError) {
    content = <p>Error Loading Sentences</p>;
  }

  return (
    <>
      <main>
        {/* <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
          <h1>Sentences</h1>
        </header> */}
        <div className="flex flex-col gap-4">
          {/* <p className="text-lg italic">{displayBlock?.title}</p> */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <form
              onSubmit={handleSubmit}
              className="flex items-center p-2 border-2 rounded-full border-zinc-600 text-zinc-600 pr-4 w-full"
            >
              <input
                type="text"
                title="Search sentences"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
              <button type="submit">
                <IoSearchOutline size={32} />
              </button>
            </form>
            {editMode ? (
              <button title="Add sentence" onClick={() => setAdd(true)}>
                <GoPlus size={28} />
              </button>
            ) : null}
          </div>
          <p>{isSuccess ? count + " results" : null}</p>
          <SortSentences sort={sort} setSort={setSort} />
          <Pagination currentPage={page} setPage={setPage} count={count} />
          <div className="w-full flex flex-col gap-4">{content}</div>
          <Pagination currentPage={page} setPage={setPage} count={count} />
          <div className="my-2">
            {displayBlock?.id ? (
              <Link
                to={`/content/lesson/${displayBlock?.id}`}
                className="flex items-center gap-2"
              >
                <span>Back to Lesson</span>
                <MdOutlinePlayLesson size={32} />
              </Link>
            ) : (
              <Link
                to={"/content/chapters"}
                className="flex items-center gap-2"
              >
                <span>Go to lessons</span>
                <MdOutlinePlayLesson size={32} />
              </Link>
            )}
          </div>
        </div>
      </main>
      {add ? <FormSentenceAdd setAdd={setAdd} /> : null}
    </>
  );
}
