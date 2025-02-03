import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyGetDialoguesQuery } from "@/features/globals/globalsApiSlice";
import DialogueImg from "/assets/dialogue.png";
import { LuMessagesSquare } from "react-icons/lu";

export default function DialoguePage() {
  const [getDialogues, { data: dialogues, isLoading, isSuccess, isError }] =
    useLazyGetDialoguesQuery();

  useEffect(() => {
    getDialogues(null);
  }, []);

  return (
    <main className="bg-zinc-200 md:px-20">
      <header className="flex items-center gap-4  mb-4 ">
        <p className="rounded-lg p-2 bg-red-600">
          <LuMessagesSquare className="text-white size-6 md:size-8" />
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold border-b-2 pb-1 border-red-700 flex-1">
          Dialogues
        </h1>
      </header>
      <div className="flex-1 flex flex-wrap flex-col sm:flex-row items-stretch gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error Loading Dialogues</p>
        ) : (
          isSuccess &&
          dialogues?.data.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-zinc-50 py-4 px-4 rounded-lg w-full min-w-[300px] max-w-[400px] lg:max-w-[500px] flex-1 flex justify-center items-center gap-4"
              >
                <img src={DialogueImg} className="w-10 h-10" />
                <div className="">
                  <Link
                    to={`/content/dialogue/${item.id}`}
                    className="md:text-xl font-semibold"
                  >
                    <span className="mr-2">{index + 1}.</span>
                    <span>{item?.title}</span>
                  </Link>
                  <p className="text-xs md:text-sm">{item?.subtitle}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
