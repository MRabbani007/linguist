import { useState } from "react";
import { HiOutlineQueueList } from "react-icons/hi2";
import { Link } from "react-router-dom";
import FormCreateWordList from "./FormCreateWordList";
import { useGetWordListsQuery } from "../profile/profileSlice";

const REVIEW = [
  { title: "Mistakes", url: "#" },
  { title: "Word Lists", url: "#" },
  { title: "Common Words", url: "#" },
  { title: "Definitions", url: "#" },
];

export default function UserWordList() {
  const [createList, setCreateList] = useState(false);

  const { data: wordLists, isLoading, isSuccess } = useGetWordListsQuery(null);

  return (
    <div>
      <div className="flex items-center gap-4 rounded-lg py-2 px-4 bg-purple-600 text-white font-medium mb-4">
        <HiOutlineQueueList size={32} />
        <span>Review</span>
        <button onClick={() => setCreateList(true)}>+</button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        {Array.isArray(wordLists) &&
          wordLists.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/review/wordlists?listID=${item.id}`}
                className="w-36 h-36 bg-red-500 text-white flex flex-col items-center justify-center rounded-lg relative"
              >
                {item.name}
              </Link>
            );
          })}
      </div>
      {createList && <FormCreateWordList setAdd={setCreateList} />}
    </div>
  );
}
