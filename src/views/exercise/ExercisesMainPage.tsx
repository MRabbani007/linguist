import { exerciseCards } from "../../data/exerciseCards";
import CardExerciseTitle from "../../features/exercises/CardExerciseTitle";

export default function ExercisesMainPage() {
  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white p-4">
        <h1 className="text-2xl">Exercises</h1>
      </header>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {exerciseCards.map((exercise, index) => {
            return <CardExerciseTitle exercise={exercise} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}
