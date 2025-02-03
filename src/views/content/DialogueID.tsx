import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DialogueNavigator from "../../features/dialogue/DialogueNavigator";
import { IoArrowBack } from "react-icons/io5";
import CardStatement from "../../features/dialogue/CardStatement";
import { useLazyGetDialogueByIDQuery } from "@/features/globals/globalsApiSlice";
import { LuMessagesSquare } from "react-icons/lu";

export default function DialogueID() {
  const params = useParams();
  const id = params.id;

  const [getDialogue, { data }] = useLazyGetDialogueByIDQuery();

  useEffect(() => {
    if (id) {
      getDialogue(id);
    }
  }, [id]);

  if (!data) return null;

  const { dialogue, statements } = data;

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
      <div className="flex">
        <p className="text-xl py-3 px-4 bg-red-600 text-white rounded-md">
          {dialogue.sortIndex}
        </p>
        <div className="flex-1">
          <h2 className="text-2xl font-bold border-b-[1px] border-red-600 px-2 py-2">
            {dialogue?.title}
          </h2>
          <p className="text-lg font-semibold px-2 py-1">{dialogue?.subject}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 text-zinc-900">
        {statements.map((item) => (
          <CardStatement statement={item} key={item.id} />
        ))}
      </div>
      <DialogueNavigator />
      <Link to={`/content/dialogue`} className="flex items-center gap-2">
        <IoArrowBack size={25} />
        <span>Back to Dialogues</span>
      </Link>
    </main>
  );
}
