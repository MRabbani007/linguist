import React from "react";
import { HiOutlineQueueList } from "react-icons/hi2";

export default function UserWordList() {
  return (
    <ul className="user-word-lists">
      <li>
        <HiOutlineQueueList size={32} />
        <span>Word Lists</span>
      </li>
      <li>
        <span>Common Words</span>
      </li>
      <li>
        <span>Verbs & nouns</span>
      </li>
      <li>
        <span>Important</span>
      </li>
    </ul>
  );
}
