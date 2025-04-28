import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDisplayLesson } from "../../features/globals/globalsSlice";
import LessonNavigator from "../../features/navigation/LessonNavigator";
import LessonHeader from "../../features/lessons/LessonHeader";
import ContentNavigator from "../../features/navigation/ContentNavigator";
import { useNavigate } from "react-router-dom";
import { useLazyGetLessonByIDQuery } from "@/features/globals/globalsApiSlice";
import Section from "@/features/sections/Section";
import LessonCompleted from "@/features/lessons/LessonCompleted";
import { motion } from "framer-motion";
import ScrollProgressBar from "@/features/ui/ScrollProgressBar";

export default function LessonPage() {
  const displayLesson = useSelector(selectDisplayLesson);

  const [getLesson, { data, isLoading, isSuccess, isError }] =
    useLazyGetLessonByIDQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (!displayLesson) {
      navigate("/learn");
    } else {
      getLesson(displayLesson.id);
    }
  }, [displayLesson]);

  if (!displayLesson) return null;

  let content;
  if (isLoading) {
    content = (
      <>
        <div className="flex-1 bg-white rounded-lg flex flex-col p-4 animate-pulse">
          <div className="flex items-stretch gap-2">
            <div className="bg-red-600 w-14 h-20 shrink-0 rounded-lg"></div>
            <div className="flex-1 flex flex-col items-stretch gap-2">
              <p className="flex-1 bg-zinc-300 rounded-lg"></p>
              <p className="flex-1 bg-zinc-300 rounded-lg"></p>
            </div>
          </div>
          <div className="flex-1 min-h-[100px]"></div>
        </div>
        <div className="flex-1 bg-white rounded-lg flex flex-col p-4 animate-pulse">
          <div className="flex items-stretch gap-2">
            <div className="bg-red-600 w-14 h-20 shrink-0 rounded-lg"></div>
            <div className="flex-1 flex flex-col items-stretch gap-2">
              <p className="flex-1 bg-zinc-300 rounded-lg"></p>
              <p className="flex-1 bg-zinc-300 rounded-lg"></p>
            </div>
          </div>
          <div className="flex-1 min-h-[100px]"></div>
        </div>
      </>
    );
  } else if (isError) {
    content = <p>Error</p>;
  } else if (isSuccess) {
    content = data.map((item: any) => (
      <Section
        key={item.id}
        definitions={item.definitions}
        words={item.words}
        section={item}
        sectionLists={item.sectionLists}
        sentences={item.sentences}
        tables={item.tables}
      />
    ));
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, [displayLesson?.id]);

  return (
    <main className="bg-zinc-200 md:px-20 flex flex-col items-stretch">
      <ScrollProgressBar />
      <div>
        <LessonHeader lesson={displayLesson} />
        <LessonNavigator />
      </div>
      {displayLesson?.lessonImage && (
        <div className="flex justify-center rounded-lg overflow-hidden bg-white p-2 md:p-6">
          <motion.img
            src={displayLesson?.lessonImage}
            alt=""
            className="max-h-[300px] lg:max-w-[50vw]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
      {Array.isArray(displayLesson?.introduction) &&
      displayLesson?.introduction?.length !== 0 ? (
        <div className="flex flex-col gap-0 py-6 px-4 bg-white rounded-lg font-medium text-zinc-700">
          {displayLesson.introduction.map((intro, index) => {
            return (
              <p key={index} className="group relative text-pretty">
                {intro}
              </p>
            );
          })}
        </div>
      ) : null}
      {/* Sections */}
      <motion.div className="flex flex-col gap-4">{content}</motion.div>
      <LessonNavigator />
      <ContentNavigator />
      {isSuccess && <LessonCompleted lessonID={displayLesson.id} />}
    </main>
  );
}
