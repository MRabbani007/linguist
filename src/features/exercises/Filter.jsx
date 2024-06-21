import React, { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "../../api/axios";

const initialStatus = {
  isLoading: true,
  isSuccess: false,
  isError: false,
};

export default function Filter({
  selectedLessons,
  setSelectedLessons,
  setShowFilter,
}) {
  const [allLessons, setAllLessons] = useState([]);
  const [status, setStatus] = useState(initialStatus);

  const getLessons = async () => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
      });
      const response = await axios.get("/exercises");
      if (response.status !== 200) {
      }
      if (Array.isArray(response.data)) {
        setStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
        setAllLessons(() =>
          response.data.map((item) => {
            const lesson = selectedLessons.find((l) => l.id === item.id);
            return {
              id: item.id,
              title: item.title,
              lessonSelected: lesson?.lessonSelected === true ? true : false,
            };
          })
        );
      }
    } catch (err) {
      setStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
      });
    }
  };

  useEffect(() => {
    getLessons();
  }, []);

  const newSelectedLessons = allLessons.filter(
    (lesson) => lesson.lessonSelected === true
  );

  const canSave = newSelectedLessons.length < 11;

  const handleSubmit = () => {
    if (canSave) {
      setSelectedLessons(newSelectedLessons);
      setShowFilter(false);
    } else {
      toast.info("Select up to 10 lessons");
    }
  };

  const handleReset = () => {
    setShowFilter(false);
  };

  const handleSelect = (index, value) => {
    setAllLessons((curr) => {
      let temp = [...curr];
      temp.splice(index, 1, { ...curr[index], lessonSelected: value });
      return temp;
    });
  };

  let lessonContent = null;
  if (status.isLoading === true) {
    lessonContent = <p>Loading...</p>;
  } else if (status.isError === true) {
    lessonContent = <p>Error Loading Lessons</p>;
  } else if (status.isSuccess === true) {
    lessonContent = (
      <ul className="h-full overflow-y-scroll">
        {allLessons.map((block, index) => (
          <li value={index} key={index} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={block.lessonSelected}
              onChange={(e) => handleSelect(index, e.target.checked)}
            />
            <span>{block?.title}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="form-container">
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
          {newSelectedLessons.length === 0
            ? "All Content"
            : newSelectedLessons.length === 1
            ? " 1 lesson selected"
            : newSelectedLessons.length + " lessons selected"}
        </p>
        {lessonContent}
      </div>
    </div>
  );
}
