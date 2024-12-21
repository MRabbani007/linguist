import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectDisplayBlock,
  selectEditMode,
} from "../../features/globals/globalsSlice";
// Imported Components
import BlockNavigator from "../../features/navigation/BlockNavigator";
// Imported Icons
import LessonSections from "../../features/sections/LessonSections";
import LessonHeader from "../../features/blocks/LessonHeader";
import LessonCompleted from "../../features/blocks/LessonCompleted";
import ContentNavigator from "../../features/navigation/ContentNavigator";
import { selectCurrentUser } from "../../features/auth/authSlice";

export default function LessonPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const user = useSelector(selectCurrentUser);

  const [addLessonIntro, setAddLessonIntro] = useState(false);
  const [addSection, setAddSection] = useState(false);

  const navigate = useNavigate();

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      if (!displayChapter) {
        navigate("/learn");
      }
      if (!displayBlock) {
        navigate("/learn");
      }
    }
  }, []);

  isMounted.current = true;

  return (
    <main>
      <div>
        <LessonHeader
          lesson={displayBlock}
          setAddLessonIntro={setAddLessonIntro}
          setAddSection={setAddSection}
        />
        <BlockNavigator />
      </div>
      {displayBlock?.lessonImage && (
        <div className="mx-auto max-h-[300px] lg:max-w-[50vw] overflow-hidden">
          <img
            src={displayBlock?.lessonImage}
            alt=""
            className="max-h-[300px] h-full"
          />
        </div>
      )}
      {Array.isArray(displayBlock?.introduction) &&
      displayBlock?.introduction?.length !== 0 ? (
        <div className="flex flex-col gap-4">
          {displayBlock.introduction.map((intro, index) => {
            return (
              <div key={index} className="group relative text-pretty flex-1">
                <span className="text-wrap">{intro}</span>
              </div>
            );
          })}
        </div>
      ) : null}
      <LessonSections
        lesson={displayBlock}
        addSection={addSection}
        setAddSection={setAddSection}
      />
      <div className="w-full">
        <BlockNavigator />
        <ContentNavigator />
      </div>

      {!!user ? <LessonCompleted /> : null}
    </main>
  );
}
