import React from "react";
import { Link } from "react-router-dom";

export default function CardExerciseTitle({ exercise }) {
  return (
    <div className=" text-center text-white ">
      <h2 className="font-extrabold bg-lime-600 p-4 text-2xl rounded-t-lg">
        <Link to={exercise.link}>{exercise?.title}</Link>
      </h2>
      <div className="p-8 bg-lime-500 text-xl rounded-b-lg">
        {exercise?.text}
      </div>
    </div>
  );
}
