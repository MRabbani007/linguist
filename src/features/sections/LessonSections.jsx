import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";
import { useGetSectionsQuery } from "./sectionSlice";
import Section from "./Section";
import SectionAdd from "./SectionAdd";
import { useGetWordsQuery } from "../words/wordsSlice";
import CardWordList from "../words/CardWordList";

export default function LessonSections() {
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const [add, setAdd] = useState(false);

  const [sectionsList, setSectionsList] = useState([]);
  const [words, setWords] = useState([]);
  const [lessonWords, setLessonWords] = useState([]);

  const {
    data: sectionsData,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSections,
    error: errorSections,
  } = useGetSectionsQuery(displayBlock?.id);

  const {
    data: wordsData,
    isLoading: isLoadingWords,
    isSuccess: isSuccessWords,
    isError: isErrorWords,
    error: errorWords,
  } = useGetWordsQuery(displayBlock?.id);

  useEffect(() => {
    if (isSuccessWords) {
      setWords(() => {
        return wordsData?.ids.map((id) => wordsData.entities[id]) ?? [];
      });
    }
  }, [wordsData]);

  useEffect(() => {
    if (isSuccessSections) {
      setSectionsList(() => {
        return sectionsData?.ids.map((id) => sectionsData.entities[id]) ?? [];
      });
    }
  }, [sectionsData]);

  useEffect(() => {
    let sectionIDList = sectionsList.map((section) => section?.id);
    let temp = words.filter((word) => !sectionIDList.includes(word?.sectionID));
    setLessonWords(temp);
  }, [words]);

  let content;
  if (isLoadingSections) {
    content = <p>"Loading..."</p>;
  } else if (isSuccessSections) {
    // destructure from normalized object
    const { ids, entities } = sectionsData;
    content = ids.map((id, index) => {
      const sectionWords = words.filter(
        (word) => word?.sectionID === entities[id]?.id
      );
      return (
        <Section
          section={entities[id]}
          words={sectionWords}
          key={id}
          index={index}
          sectionsList={sectionsList}
        />
      );
    });
  } else if (isErrorSections) {
    content = <p>{errorSections}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Sections */}
      <div className="flex flex-col gap-3">{content}</div>
      {/* Lesson Words */}
      <div className="flex flex-col gap-3">
        {lessonWords.map((word, index) => {
          return (
            <CardWordList word={word} key={index} sectionsList={sectionsList} />
          );
        })}
      </div>
      {add ? (
        <SectionAdd setAdd={setAdd} />
      ) : editMode ? (
        <button
          className="btn btn-red w-fit mx-auto"
          onClick={() => setAdd(true)}
        >
          Add Section
        </button>
      ) : null}
    </div>
  );
}
