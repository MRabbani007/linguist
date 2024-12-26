import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { BiX } from "react-icons/bi";
import { useGetExerciseLessonsQuery } from "../globals/globalsApiSlice";

export default function Filter({
  selectedLessons,
  setSelectedLessons,
  setShowFilter,
}: {
  selectedLessons: string[];
  setSelectedLessons: Dispatch<SetStateAction<string[]>>;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}) {
  const [newSelection, setNewSelection] = useState(selectedLessons);

  const { data, isLoading, isSuccess, isError } =
    useGetExerciseLessonsQuery(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setSelectedLessons(newSelection);
    setShowFilter(false);
  };

  const handleReset = () => {
    setShowFilter(false);
  };

  const handleSelect = (id: string) => {
    setNewSelection((curr) => {
      let index = curr.findIndex((item) => item === id);
      if (index >= 0) {
        const temp = [...curr];
        temp.splice(index, 1);
        return temp;
      } else {
        return [...curr, id];
      }
    });
  };

  let lessonContent = null;
  if (isLoading === true) {
    lessonContent = <p>Loading...</p>;
  } else if (isError === true) {
    lessonContent = <p>Error Loading Lessons</p>;
  } else if (isSuccess === true) {
    lessonContent = (
      <div className="h-full overflow-y-scroll">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                newSelection.find((selected) => selected === item.id)
                  ? true
                  : false
              }
              onChange={() => handleSelect(item.id)}
            />
            <span>{item?.title}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-zinc-200 rounded-md p-4 max-h-[60vh] flex flex-col min-w-[300px]">
        <div className="flex items-center justify-between">
          <button onClick={handleSubmit} title="Save" className="save">
            Save
          </button>
          <button
            onClick={handleReset}
            title="Cancel"
            className="rounded-full p-1 bg-zinc-300 hover:bg-zinc-400"
          >
            <BiX size={25} />
          </button>
        </div>
        <p
          className="p-2 bg-zinc-300 rounded-md my-2"
          title="Select up to 10 lessons"
        >
          {newSelection.length === 0
            ? "All Content"
            : newSelection.length === 1
            ? " 1 lesson selected"
            : newSelection.length + " lessons selected"}
        </p>
        {lessonContent}
      </div>
    </div>
  );
}
