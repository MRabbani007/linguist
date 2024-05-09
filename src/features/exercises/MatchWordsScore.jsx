import React from "react";
import { BiSolidBadge } from "react-icons/bi";
import { BsTrophyFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";

export default function MatchWordsScore({ score, lives, highestScore }) {
  return (
    <div className="flex justify-evenly rounded-md bg-red-400 text-white py-3 px-5 mb-2">
      <p title="Lives" className="flex items-center gap-3 relative w-fit">
        <IoMdHeart size={40} />
        <span className="absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] text-red-600 font-semibold">
          {lives}
        </span>
      </p>
      <p title="Streak" className="flex items-center gap-3 relative w-fit">
        <BiSolidBadge size={45} />
        <span className="absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] text-red-600 font-semibold">
          {score}
        </span>
      </p>
      <p
        title="Highest Score"
        className="flex items-center gap-3 relative w-fit"
      >
        <BsTrophyFill size={50} />
        <span className="absolute top-[30%] right-[50%] translate-x-[50%] -translate-y-[50%] text-red-600 font-semibold">
          {highestScore}
        </span>
      </p>
    </div>
  );
}
