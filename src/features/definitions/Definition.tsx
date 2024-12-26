import { HiOutlineLightBulb } from "react-icons/hi2";

export default function Definition({ definition }: { definition: Definition }) {
  return (
    <article className="w-fit min-w-[300px] max-w-[400px] flex flex-col">
      <div className="group flex items-center gap-4 px-4 py-2 text-red-700  bg-zinc-200">
        <HiOutlineLightBulb size={20} className="" />
        <p className="text-lg font-medium">
          <span>{definition?.title}</span>
        </p>
      </div>
      <div className="flex-1 text-sm text-pretty p-4 bg-zinc-100">
        <p>{definition?.text}</p>
        <p>{definition?.notes}</p>
        <p>{definition?.caption}</p>
      </div>
    </article>
  );
}
