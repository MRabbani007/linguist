import { useSelector } from "react-redux";
import {
  selectChapters,
  selectLessons,
} from "../../features/globals/globalsSlice";
import CardChapter from "../../features/chapters/CardChapter";
import CardLesson from "../../features/lessons/CardLesson";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { motion } from "framer-motion";

export default function ContentPage() {
  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);

  return (
    <main className="bg-zinc-200 md:px-20">
      <header className="flex items-center gap-4">
        <p className="rounded-lg p-2 bg-red-600">
          <TfiLayoutListThumb className="text-white size-6 md:size-8" />
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold border-b-2 pb-1 border-red-700 flex-1">
          Content Overview
        </h1>
      </header>
      {chapters.map((chapter, index) => {
        return (
          <motion.div
            // initial="hidden"
            // animate="visible"
            // variants={{
            //   hidden: { opacity: 0 },
            //   visible: {
            //     opacity: 1,
            //     transition: { staggerChildren: 0.2 },
            //   },
            // }}
            // viewport={{ once: true, amount: 0.2 }} // Triggers when 20% is in view
            className="flex flex-col items-stretch"
            key={index}
          >
            <CardChapter chapter={chapter} />
            <motion.div
              // initial="hidden"
              // animate="visible"
              // transition={{ staggerChildren: 0.2, delay: 0.6 }}
              // viewport={{ once: true, amount: 0.2 }} // Triggers when 20% is in view
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6"
            >
              {lessons
                .filter((item) => item.chapterID === chapter.id)
                .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
                .map((lesson, idx) => {
                  return (
                    <CardLesson lesson={lesson} chapter={chapter} key={idx} />
                  );
                })}
            </motion.div>
          </motion.div>
        );
      })}
    </main>
  );
}
