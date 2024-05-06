import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
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

export default function LessonSections({ lesson, addSection, setAddSection }) {
  const editMode = useSelector(selectEditMode);

  // List of sections to move words
  const [sectionsList, setSectionsList] = useState([]);

  const [words, setWords] = useState([]);
  const [lessonWords, setLessonWords] = useState([]);

  const [definitions, setDefinitions] = useState([]);
  const [lessonDefinitions, setLessonDefinitions] = useState([]);

  const [tables, setTables] = useState([]);
  const [lessonTables, setLessonTables] = useState([]);

  const [tableWords, setTableWords] = useState([]);
  const [lessonTableWords, setLessonTableWords] = useState([]);

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
    if (isSuccessDefs) {
      setDefinitions(() => {
        return defsData?.ids.map((id) => defsData.entities[id]) ?? [];
      });
    }
  }, [defsData]);

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
    setLessonDefinitions(temp);
  }, [tables, sectionsList]);

  let defsContent = lessonDefinitions.map((def, index) => (
    <Definition definition={def} key={index} />
  ));

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
      const sectionDefinitions = definitions.filter(
        (def) => def?.sectionID === entities[id]?.id
      );
      const sectionTables = tables.filter(
        (table) => table?.sectionID === entities[id]?.id
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
          sectionsList={sectionsList}
        />
      );
    });
  } else if (isErrorSections) {
    content = <p>{errorSections}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">{defsContent}</div>

      {/* Sections */}
      <div className="flex flex-col gap-3">{content}</div>

      {/* Lesson Words */}
      {lessonWords.length !== 0 && (
        <div className="flex flex-col gap-3">
          {lessonWords.map((word, index) => {
            return (
              <CardWordList
                word={word}
                key={index}
                sectionsList={sectionsList}
              />
            );
          })}
        </div>
      )}

      {/* Lesson Tables */}
      {lessonTables.length !== 0 && (
        <div className="flex flex-col gap-3">
          {lessonTables.map((table, index) => {
            return <TableCard table={table} key={index} />;
          })}
        </div>
      )}

      {addSection ? <SectionAdd setAdd={setAddSection} /> : null}
    </div>
  );
}
