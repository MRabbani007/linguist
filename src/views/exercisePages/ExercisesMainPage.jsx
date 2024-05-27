import React from "react";
import MatchWords from "../../features/exercises/MatchWords";
import { exerciseCards } from "../../data/exerciseCards";
import CardExerciseTitle from "../../features/exercises/CardExerciseTitle";

export default function ExercisesMainPage() {
  return (
    <main className="flex flex-col items-center gap-3 flex-1 max-w-[1000px] mx-auto">
      <header className="py-4 px-4 bg-gradient-to-r from-zinc-600 to-zinc-400 text-white w-full rounded-lg">
        <h1 className="text-2xl">Exercises</h1>
      </header>
      <div className="flex flex-wrap items-stretch justify-center gap-3 flex-1">
        {exerciseCards.map((exercise, index) => {
          return <CardExerciseTitle exercise={exercise} key={index} />;
        })}
      </div>
      {/* <MatchWords /> */}
    </main>
  );
}
