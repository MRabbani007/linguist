export default function ListSection({ list }: { list: SectionList }) {
  let content = list.items.map((item, index) => {
    return (
      <li key={index} className="group">
        {item}
      </li>
    );
  });

  return (
    <article className="flex flex-col gap-4">
      {/* title */}
      {list?.title && (
        <p>
          <strong className="text-xl font-light">{list?.title}</strong>
        </p>
      )}

      {list?.text ? <p className="">{list?.text}</p> : null}

      {list?.type === "OL" ? (
        <ol className="list-decimal list-inside space-y-1">{content}</ol>
      ) : (
        <ul className="list-disc list-inside space-y-1">{content}</ul>
      )}

      {list?.notes ? <p className="">{list.notes}</p> : null}
    </article>
  );
}
