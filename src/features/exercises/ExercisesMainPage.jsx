import React from "react";
import MatchWords from "./MatchWords";
import { exerciseCards } from "../../data/exerciseCards";
import CardExerciseTitle from "./CardExerciseTitle";

export default function ExercisesMainPage() {
  return (
    <div className="flex flex-col items-center gap-3 flex-1">
      <h1>Exercises</h1>
      <div className="flex flex-wrap items-stretch justify-center gap-3 flex-1">
        {exerciseCards.map((exercise, index) => {
          return <CardExerciseTitle exercise={exercise} key={index} />;
        })}
      </div>
      {/* <MatchWords /> */}
    </div>
  );
}
