const CardProgress = () => {
  return (
    <div className="w-fit">
      <h2 className="bg-red-600 text-red-50 rounded-t-lg py-2 px-4">
        Progress
      </h2>
      <p className="flex gap-3 py-2 px-4 border-2 border-red-600">
        <span>Learn Russian</span>
        <span>0% Completed</span>
      </p>
      <div className="flex gap-3 bg-red-600 text-red-50 rounded-b-lg py-2 px-4">
        <span>Continue Current Lesson:</span>Basic Words<span></span>
      </div>
    </div>
  );
};

export default CardProgress;
