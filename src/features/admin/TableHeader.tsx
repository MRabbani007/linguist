export default function TableHeader() {
  return (
    <div className="flex items-center p-2 text-center border-2 border-zinc-200">
      <span className="w-[2%]" title="Serial Number">
        #
      </span>
      <span className="flex-1 md:w-[20%]" title="Lesson Title">
        Title
      </span>
      <span className="flex-1 md:w-[20%]" title="Lesson Sub-title">
        Sub-Title
      </span>
      <span className="hidden md:inline-block md:flex-1" title="Lesson Detail">
        Detail
      </span>
      <span className="w-[10%]">Status</span>
      <span className="w-[15%] text-center" title="Edit Lesson">
        Edit
      </span>
    </div>
  );
}
