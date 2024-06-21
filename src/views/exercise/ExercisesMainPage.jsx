import { exerciseCards } from "../../data/exerciseCards";
import CardExerciseTitle from "../../features/exercises/CardExerciseTitle";

export default function ExercisesMainPage() {
  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Exercises</h1>
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
