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
import { IoIosSearch } from "react-icons/io";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import Pagination from "../../features/components/Pagination";

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
    getSentencesAll({ searchTerm: value, lessonID, page });
  }, [value, page]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setSentences(data.ids.map((id) => data.entities[id]));
    }
  }, [data, isSuccess]);

  let content = "";
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = data.ids.map((id) => {
      return <Sentence sentence={data.entities[id]} key={id} />;
    });
  } else if (isError) {
    content = <p>Error Loading Sentences</p>;
  }

  return (
    <>
      <main>
        <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
          <h1>Sentences</h1>
        </header>
        <div className="flex flex-col gap-4">
          {/* <p className="text-lg italic">{displayBlock?.title}</p> */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <p>{isSuccess ? count + " results" : null}</p>
            <form
              onSubmit={handleSubmit}
              className="flex items-center p-2 border-2 rounded-full border-zinc-600 text-zinc-600 pr-4"
            >
              <input
                type="text"
                title="Search sentences"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          <Pagination currentPage={page} setPage={setPage} count={count} />
          <div className="w-full flex flex-col gap-4">{content}</div>
          <Pagination currentPage={page} setPage={setPage} count={count} />
          <div className="my-2">
            {displayBlock?.id ? (
              <Link
                to={`/lesson/${displayBlock?.id}`}
                className="flex items-center gap-2"
              >
                <span>Back to Lesson</span>
                <MdOutlinePlayLesson size={32} />
              </Link>
            ) : (
              <Link to={"/chapters"} className="flex items-center gap-2">
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
