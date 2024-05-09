import React from "react";
import { Link } from "react-router-dom";

export default function CardExerciseTitle({ exercise }) {
  return (
    <div className="exercise-card">
      <h2>
        <Link to={exercise.link}>{exercise?.title}</Link>
      </h2>
      <div>{exercise?.text}</div>
    </div>
  );
}
