import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode, setSections } from "../globals/globalsSlice";
import { useGetSectionsQuery } from "./sectionSlice";
import { useGetDefinitionsQuery } from "../definitions/definitionsSlice";
import Section from "./Section";
import SectionAdd from "./SectionAdd";
import { useGetWordsQuery } from "../words/wordsSlice";
import CardWordList from "../words/CardWordList";
import Definition from "../definitions/Definition";
import { useGetTablesQuery } from "../tables/tablesSlice";
import TableCard from "../tables/TableCard";
import { useGetTableWordsQuery } from "../tableWords/tableWordsSlice";
import { useGetSectionListsQuery } from "../sectionList/sectionListSlice";
import { useGetSentencesQuery } from "../sentences/sentencesSlice";
import CardWord from "../words/CardWord";

export default function LessonSections({ lesson, addSection, setAddSection }) {
  const dispatch = useDispatch();

  // List of sections to move words
  const [sectionsList, setSectionsList] = useState([]);

  const [definitions, setDefinitions] = useState([]);
  const [lessonDefinitions, setLessonDefinitions] = useState([]);

  const [lists, setLists] = useState([]);

  const [tables, setTables] = useState([]);
  const [lessonTables, setLessonTables] = useState([]);

  const [tableWords, setTableWords] = useState([]);

  const [words, setWords] = useState([]);
  const [lessonWords, setLessonWords] = useState([]);

  const [sentences, setSentences] = useState([]);

  const {
    data: sectionsData,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSections,
    error: errorSections,
  } = useGetSectionsQuery(lesson?.id);

  const {
    data: wordsData,
    isLoading: isLoadingWords,
    isSuccess: isSuccessWords,
    isError: isErrorWords,
    error: errorWords,
  } = useGetWordsQuery(lesson?.id);

  const {
    data: defsData,
    isLoading: isLoadingDefs,
    isSuccess: isSuccessDefs,
    isError: isErrorDefs,
    error: errorDefs,
  } = useGetDefinitionsQuery(lesson?.id);

  const {
    data: listsData,
    isLoading: isLoadingLists,
    isSuccess: isSuccessLists,
    isError: isErrorLists,
    error: errorLists,
  } = useGetSectionListsQuery(lesson?.id);

  const {
    data: tablesData,
    isLoading: isLoadingTables,
    isSuccess: isSuccessTables,
    isError: isErrorTables,
    error: errorTables,
  } = useGetTablesQuery(lesson?.id);

  const {
    data: tableWordsData,
    isLoading: isLoadingTableWords,
    isSuccess: isSuccessTableWords,
    isError: isErrorTableWords,
    error: errorTableWords,
  } = useGetTableWordsQuery(lesson?.id);

  const {
    data: sentenceData,
    isLoading: isLoadingSentence,
    isSuccess: isSuccessSentence,
    isError: isErrorSentence,
    error: errorSentence,
  } = useGetSentencesQuery(lesson?.id);

  useEffect(() => {
    if (isSuccessWords) {
      setWords(() => {
        return wordsData?.ids.map((id) => wordsData.entities[id]) ?? [];
      });
    }
  }, [wordsData]);

  useEffect(() => {
    if (isSuccessSections) {
      const temp =
        sectionsData?.ids.map((id) => sectionsData.entities[id]) ?? [];
      dispatch(setSections(temp));
      setSectionsList(temp);
    }
  }, [sectionsData]);

  useEffect(() => {
    if (isSuccessDefs) {
      setDefinitions(() => {
        return defsData?.ids.map((id) => defsData.entities[id]) ?? [];
      });
    }
  }, [defsData]);

  useEffect(() => {
    if (isSuccessLists) {
      setLists(() => {
        return listsData?.ids.map((id) => listsData.entities[id]) ?? [];
      });
    }
  }, [listsData]);

  useEffect(() => {
    if (isSuccessTables) {
      setTables(() => {
        return tablesData?.ids.map((id) => tablesData.entities[id]) ?? [];
      });
    }
  }, [tablesData]);

  useEffect(() => {
    if (isSuccessTableWords) {
      setTableWords(() => {
        return (
          tableWordsData?.ids.map((id) => tableWordsData.entities[id]) ?? []
        );
      });
    }
  }, [tableWordsData]);

  useEffect(() => {
    if (isSuccessSentence) {
      setSentences(() => {
        return sentenceData?.ids.map((id) => sentenceData.entities[id]) ?? [];
      });
    }
  }, [sentenceData]);

  // filter words that are not part of a section
  useEffect(() => {
    let sectionIDList = sectionsList.map((section) => section?.id);
    let temp = words.filter((word) => {
      return !sectionIDList.includes(word?.sectionID);
    });
    setLessonWords(temp);
  }, [words, sectionsList]);

  // filter definitions that are not part of a section
  useEffect(() => {
    let sectionIDList = sectionsList.map((section) => section?.id);
    let temp = definitions.filter((def) => {
      return !sectionIDList.includes(def?.sectionID);
    });
    setLessonDefinitions(temp);
  }, [definitions, sectionsList]);

  // filter tables that are not part of a section
  useEffect(() => {
    let sectionIDList = sectionsList.map((section) => section?.id);
    let temp = tables.filter((table) => {
      return !sectionIDList.includes(table?.sectionID);
    });
    setLessonTables(temp);
  }, [tables, sectionsList]);

  let defsContent = lessonDefinitions.map((def, index) => (
    <Definition definition={def} key={index} />
  ));

  let content;
  if (isLoadingSections) {
    content = <p>Loading...</p>;
  } else if (isSuccessSections) {
    // destructure from normalized object
    const { ids, entities } = sectionsData;
    content = ids.map((id, index) => {
      const sectionWords = words.filter(
        (word) => word?.sectionID === entities[id]?.id
      );
      const sectionDefinitions = definitions.filter(
        (def) => def?.sectionID === entities[id]?.id
      );
      const sectionTables = tables.filter(
        (table) => table?.sectionID === entities[id]?.id
      );
      const sectionLists = lists.filter(
        (list) => list?.sectionID === entities[id]?.id
      );
      const sectionSentences = sentences.filter(
        (item) => item?.sectionID === entities[id]?.id
      );
      return (
        <Section
          section={entities[id]}
          words={sectionWords}
          key={id}
          index={index}
          definitions={sectionDefinitions}
          tables={sectionTables}
          tableWords={tableWords}
          sectionLists={sectionLists}
          sentences={sectionSentences}
        />
      );
    });
  } else if (isErrorSections) {
    content = <p>{errorSections}</p>;
  }

  const tempTime =
    (definitions?.length || 0) * 60 +
    (lists?.length || 0) * 60 * 3 +
    (tables?.length || 0) * 30 +
    (tableWords?.length || 0) * 60 +
    (words?.length || 0) * 45 +
    (sentences?.length || 0) * 75;

  const learningTime = {
    hours: Math.floor(tempTime / 3600),
    minutes: Math.floor((tempTime % 3600) / 60),
  };

  return (
    <>
      {/* {editMode ? (
        <div className="absolute top-24 right-4">
          <p>{`${definitions?.length} definitions`}</p>
          <p>{`${lists?.length} lists`}</p>
          <p>{`${tables?.length} tables`}</p>
          <p>{`${tableWords?.length} table words`}</p>
          <p>{`${words?.length} words`}</p>
          <p>{`${sentences?.length} sentences`}</p>
          <p>{`${learningTime.hours} Hours ${learningTime.minutes} minutes`}</p>
        </div>
      ) : null} */}
      {defsContent?.length !== 0 && (
        <div className="flex flex-wrap items-stretch gap-4">{defsContent}</div>
      )}

      {/* Sections */}
      {content?.length !== 0 && <>{content}</>}

      {/* Lesson Words */}
      {lessonWords.length !== 0 && (
        <>
          {words.length > lessonWords.length ? <br /> : null}
          <>
            {lessonWords.map((word, index) => {
              return <CardWord key={index} word={word} />;
            })}
          </>
        </>
      )}

      {/* Lesson Tables */}
      {lessonTables.length !== 0 && (
        <>
          {lessonTables.map((table, index) => {
            return <TableCard table={table} key={index} />;
          })}
        </>
      )}

      {addSection ? <SectionAdd setAdd={setAddSection} /> : null}
    </>
  );
}
