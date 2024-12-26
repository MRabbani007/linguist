export default function SectionTitle({ section }: { section: Section }) {
  return (
    <div className="flex items-stretch group relative">
      <p className="text-accent_foreground bg-accent shrink-0 flex items-center justify-center font-medium px-4 text-lg">
        {(section?.sortIndex ? section?.sortIndex : 0).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
      <div className="flex flex-col flex-1 text-destructive_foreground">
        <div className="border-b-[1px] border-accent flex items-center gap-4">
          <h3 className="font-semibold text-xl md:text-2xl px-4 py-2 flex-1">
            {section?.title}
          </h3>
        </div>
        {section?.subtitle && (
          <p className=" px-4 py-1">
            <i className="">{section?.subtitle}</i>
          </p>
        )}
      </div>
    </div>
  );
}
