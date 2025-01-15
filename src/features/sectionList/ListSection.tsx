export default function ListSection({ list }: { list: SectionList }) {
  let content = list.items.map((item, index) => {
    return (
      <li key={index} className="group">
        {item}
      </li>
    );
  });

  return (
    <article className="flex flex-col">
      {/* title */}
      {list?.title && list.title !== "" && (
        <p className="text-xl font-light">{list?.title}</p>
      )}
      {list?.text && list.text !== "" ? <p className="">{list?.text}</p> : null}
      {list?.type === "OL" ? (
        <ol className="list-decimal list-inside">{content}</ol>
      ) : (
        <ul className="list-disc list-inside">{content}</ul>
      )}
      {list?.notes ? <p className="">{list.notes}</p> : null}
    </article>
  );
}
