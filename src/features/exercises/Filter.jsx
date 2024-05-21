import React, { useEffect, useState } from "react";
import { useGetAllBlocksQuery } from "../blocks/blockSlice";
import { useGetChaptersQuery } from "../chapters/chapterSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../globals/globalsSlice";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";

export default function Filter({
  selectedLessons,
  setSelectedLessons,
  setShowFilter,
}) {
  const language = useSelector(selectLanguage);
  const [allLessons, setAllLessons] = useState([]);
  const [selected, setSelected] = useState("");

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

  const { data, isSuccess } = useGetAllBlocksQuery(language?.id);

  useEffect(() => {
    if (isSuccess) {
      setAllLessons(() =>
        data.ids.map((id) => {
          const lesson = selectedLessons.find(
            (item) => item.id === data.entities[id].id
          );
          let isSelected = false;
          if (lesson?.id) {
            isSelected = lesson?.lessonSelected || false;
          }
          return { ...data.entities[id], lessonSelected: isSelected };
        })
      );
    }
  }, [data]);

  const handleSelect = (index, value) => {
    setAllLessons((curr) => {
      let temp = [...curr];
      temp.splice(index, 1, { ...curr[index], lessonSelected: value });
      return temp;
    });
  };

  let lessonContent = allLessons.map((block, index) => (
    <li value={index} key={index} className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={block.lessonSelected}
        onChange={(e) => handleSelect(index, e.target.checked)}
      />
      <span>{block?.title}</span>
    </li>
  ));

  const {
    data: chaptersData,
    isLoading: isLoadingChapters,
    isSuccess: isSuccessChapters,
    isError: isErrorChapters,
    error: errorChapters,
  } = useGetChaptersQuery();

  const [chapters, setChapters] = useState([]);

  // denoralize chapters data
  useEffect(() => {
    if (isSuccessChapters) {
      setChapters(() => {
        return chaptersData.ids.map((id) => chaptersData.entities[id]);
      });
    }
  }, [chaptersData]);

  return (
    <div className="form-container">
      <div className="bg-zinc-200 rounded-md p-4 max-h-[60vh] flex flex-col">
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
        <ul className="h-full overflow-y-scroll">{lessonContent}</ul>
      </div>
    </div>
  );
}
