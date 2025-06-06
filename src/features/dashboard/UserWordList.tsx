import { useState } from "react";
import { HiOutlineQueueList } from "react-icons/hi2";
import { Link } from "react-router-dom";
import FormCreateWordList from "./FormCreateWordList";
import { useGetWordListsQuery } from "../profile/profileSlice";
import { CiEdit } from "react-icons/ci";
import FormEditWordList from "./FormEditWordList";
import { BiPlus } from "react-icons/bi";

export default function UserWordList() {
  const [createList, setCreateList] = useState(false);

  const { data: wordLists } = useGetWordListsQuery(null);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<WordList | null>(null);

  return (
    <div>
      <div className="flex items-center gap-4 rounded-lg py-2 px-4 bg-purple-600 text-white font-medium mb-4">
        <HiOutlineQueueList size={32} />
        <span>Review</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        {Array.isArray(wordLists) &&
          wordLists.map((item, index) => {
            return (
              <div
                key={index}
                className=" p-4 w-36 h-36 bg-red-500 text-white flex flex-col items-center justify-center rounded-lg relative group"
              >
                <Link
                  to={`/review/wordlists?listID=${item.id}`}
                  className="my-auto font-medium"
                >
                  {item.name}
                </Link>
                <button
                  onClick={() => {
                    setEdit(true);
                    setEditItem(item);
                  }}
                  className="absolute bottom-2 right-2 ml-auto invisible opacity-0 group-hover:opacity-100 group-hover:visible duration-200"
                >
                  <CiEdit size={20} />
                </button>
              </div>
            );
          })}
        <div className=" p-4 w-36 h-36 bg-red-500 text-white flex flex-col items-center justify-center rounded-lg relative">
          <button onClick={() => setCreateList(true)}>
            <BiPlus size={30} className="mx-auto" />
            Create List
          </button>
        </div>
      </div>
      {createList && <FormCreateWordList setAdd={setCreateList} />}
      {edit && editItem && (
        <FormEditWordList setEdit={setEdit} wordList={editItem} />
      )}
    </div>
  );
}
