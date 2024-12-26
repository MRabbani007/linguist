import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyGetDialoguesQuery } from "@/features/globals/globalsApiSlice";
import DialogueImg from "/assets/dialogue.png";

export default function DialoguePage() {
  const [getDialogues, { data: dialogues, isLoading, isSuccess, isError }] =
    useLazyGetDialoguesQuery();

  useEffect(() => {
    getDialogues(null);
  }, []);

  return (
    <main>
      <header>
        <h1 className="font-bold text-3xl p-4 bg-primary_foreground">
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
          dialogues.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-zinc-200 py-4 px-8 rounded-lg w-full min-w-[300px] max-w-[400px] lg:max-w-[500px] flex-1"
              >
                <div className=" flex justify-center items-center">
                  <img src={DialogueImg} className="w-20 h-20" />
                </div>
                <Link
                  to={`/content/dialogue/${item.id}`}
                  className="text-2xl font-semibold"
                >
                  <span className="mr-2">{index + 1}.</span>
                  <span>{item?.title}</span>
                </Link>
                <p className="text-sm">{item?.subtitle}</p>
                {/* <p>{item.createdAt?.toString().substring(0, 10)}</p> */}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
