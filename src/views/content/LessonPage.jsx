import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectDisplayBlock,
  selectEditMode,
} from "../../features/globals/globalsSlice";
// Imported Components
import BlockNavigator from "../../features/navigation/BlockNavigator";
// Imported Icons
import LessonIntro from "../../features/blocks/LessonIntro";
import LessonSections from "../../features/sections/LessonSections";
import LessonHeader from "../../features/blocks/LessonHeader";
import LessonCompleted from "../../features/blocks/LessonCompleted";
import ContentNavigator from "../../features/navigation/ContentNavigator";
import { selectCurrentUser } from "../../features/auth/authSlice";
import FormWordAdd from "../../features/words/FormWordAdd";

export default function LessonPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const user = useSelector(selectCurrentUser);

  const [viewAddWord, setViewAddWord] = useState(false);
  const [addLessonIntro, setAddLessonIntro] = useState(false);
  const [addSection, setAddSection] = useState(false);

  const navigate = useNavigate();

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      if (!displayChapter) {
        navigate("/content/chapters");
      }
      if (!displayBlock) {
        navigate("/content/sections");
      }
    }
  }, []);

  isMounted.current = true;

  return (
    <>
      <main>
        <BlockNavigator />
        <LessonHeader
          lesson={displayBlock}
          setAddLessonIntro={setAddLessonIntro}
          setAddSection={setAddSection}
        />
        <div className="flex flex-col gap-4">
          <LessonIntro
            lesson={displayBlock}
            addLessonIntro={addLessonIntro}
            setAddLessonIntro={setAddLessonIntro}
          />

          {/* {(displayBlock?.detail ||
            displayBlock?.text ||
            displayBlock?.notes) && (
            <article>
              {displayBlock?.detail ? <p>{displayBlock?.detail}</p> : null}
              {displayBlock?.text ? <p>{displayBlock?.text}</p> : null}
              {displayBlock?.notes ? <p>{displayBlock?.notes}</p> : null}
            </article>
          )} */}

          <LessonSections
            lesson={displayBlock}
            addSection={addSection}
            setAddSection={setAddSection}
          />

          {/* {editMode && (
            <button
              className="btn btn-red w-fit mx-auto "
              onClick={() => setViewAddWord(true)}
            >
              Add Word
            </button>
          )} */}
          {displayBlock?.caption ? (
            <div className="">{displayBlock?.caption}</div>
          ) : null}
          {/* footer */}
        </div>

        <BlockNavigator />
        <ContentNavigator />

        {!!user ? <LessonCompleted /> : null}
      </main>

      {viewAddWord && <FormWordAdd add={viewAddWord} setAdd={setViewAddWord} />}
    </>
  );
}
