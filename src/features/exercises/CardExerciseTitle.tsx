import { Link } from "react-router-dom";

export default function CardExerciseTitle({
  exercise,
}: {
  exercise: { link: string; title: string; text: string };
}) {
  return (
    <div className=" text-center ">
      <h2 className="font-bold bg-zinc-400 p-4 text-2xl text-zinc-900 rounded-t-lg">
        <Link to={exercise.link}>{exercise?.title}</Link>
      </h2>
      <div className="p-8 bg-zinc-200 text-xl rounded-b-lg">
        {exercise?.text}
      </div>
    </div>
  );
}
