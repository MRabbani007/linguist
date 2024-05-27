import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectDisplayBlock,
  selectEditMode,
} from "../features/globals/globalsSlice";
// Imported Components
import CardWordAdd from "../features/words/CardWordAdd";
import BlockNavigator from "../features/navigation/BlockNavigator";
// Imported Icons
import LessonIntro from "../features/blocks/LessonIntro";
import LessonSections from "../features/sections/LessonSections";
import LessonHeader from "../features/blocks/LessonHeader";
import LessonHeaderEdit from "../features/blocks/LessonHeaderEdit";
import LessonEditDetails from "../features/blocks/LessonEditDetails";
import LessonCompleted from "../features/blocks/LessonCompleted";
import ContentNavigator from "../features/navigation/ContentNavigator";

export default function LessonPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const [viewAddWord, setViewAddWord] = useState(false);
  const [addLessonIntro, setAddLessonIntro] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [editLessonTitle, setEditLessonTitle] = useState(false);
  const [editLessonDetails, setEditLessonDetails] = useState(false);

  const navigate = useNavigate();

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      if (!displayChapter) {
        navigate("/chapters");
      }
      if (!displayBlock) {
        navigate("/sections");
      }
    }
  }, []);

  isMounted.current = true;

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1000px] mx-auto">
      <BlockNavigator>
        <LessonHeader
          lesson={displayBlock}
          setEditLessonTitle={setEditLessonTitle}
          setEditLessonDetails={setEditLessonDetails}
          setAddLessonIntro={setAddLessonIntro}
          setAddSection={setAddSection}
        />
      </BlockNavigator>
      <LessonIntro
        lesson={displayBlock}
        addLessonIntro={addLessonIntro}
        setAddLessonIntro={setAddLessonIntro}
      />

      {(displayBlock?.detail || displayBlock?.text || displayBlock?.notes) && (
        <article>
          {displayBlock?.detail ? <p>{displayBlock?.detail}</p> : null}
          {displayBlock?.text ? <p>{displayBlock?.text}</p> : null}
          {displayBlock?.notes ? <p>{displayBlock?.notes}</p> : null}
        </article>
      )}

      <LessonSections
        lesson={displayBlock}
        addSection={addSection}
        setAddSection={setAddSection}
      />

      {editMode && (
        <button
          className="btn btn-red w-fit mx-auto"
          onClick={() => setViewAddWord(true)}
        >
          Add Word
        </button>
      )}

      {displayBlock?.caption ? (
        <div className="">{displayBlock?.caption}</div>
      ) : null}
      {/* footer */}

      {editLessonTitle ? (
        <LessonHeaderEdit lesson={displayBlock} setEdit={setEditLessonTitle} />
      ) : editLessonDetails ? (
        <LessonEditDetails
          lesson={displayBlock}
          setEdit={setEditLessonDetails}
        />
      ) : null}

      {viewAddWord && <CardWordAdd add={viewAddWord} setAdd={setViewAddWord} />}

      <BlockNavigator />
      <ContentNavigator />

      <LessonCompleted />
    </div>
  );
}
