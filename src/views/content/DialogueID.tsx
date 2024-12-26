import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DialogueNavigator from "../../features/dialogue/DialogueNavigator";
import { IoArrowBack } from "react-icons/io5";
import CardStatement from "../../features/dialogue/CardStatement";
import { useLazyGetDialogueByIDQuery } from "@/features/globals/globalsApiSlice";

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
    <main className="">
      <header className="bg-zinc-200 p-4 flex items-center text-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{dialogue?.title}</h1>
          <p className="text-xl font-semibold">{dialogue?.subject}</p>
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-4 text-zinc-900">
        {statements.map((item, idx) => (
          <CardStatement statement={item} key={idx} dialogue={dialogue} />
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
