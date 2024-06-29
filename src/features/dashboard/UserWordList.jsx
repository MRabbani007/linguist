import React from "react";
import { HiOutlineQueueList } from "react-icons/hi2";
import { Link } from "react-router-dom";

const REVIEW = [
  { title: "Mistakes", url: "#" },
  { title: "Word Lists", url: "#" },
  { title: "Common Words", url: "#" },
  { title: "Definitions", url: "#" },
];

export default function UserWordList() {
  return (
    <div>
      <div className="flex items-center gap-4 rounded-lg py-2 px-4 bg-purple-600 text-white font-medium mb-4">
        <HiOutlineQueueList size={32} />
        <span>Review</span>
      </div>
      <ul className="flex flex-wrap items-center gap-4 w-full">
        {REVIEW.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item.url}
                className="w-36 h-36 bg-red-500 text-white flex flex-col items-center justify-center rounded-lg relative"
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
