export default function CardConjTable({
  table,
  tableWords,
}: {
  table: ConjTable;
  tableWords: TableWord[];
}) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="w-full">
        <div className="group relative">
          <p>{table?.title}</p>
          <p>{table?.subtitle}</p>
        </div>
        <div>{table?.text}</div>
      </div>
      <table className="lesson-table">
        <caption className="group relative">
          <span>{table?.caption}</span>
        </caption>
        <thead>
          {table.colsTitles.length !== 0 && (
            <tr>
              <th></th>
              {Array.isArray(table?.colsTitles) &&
                table.colsTitles.map((colTitle, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      colSpan={table?.colsTitlesColSpan[index]}
                    >
                      {colTitle}
                    </th>
                  );
                })}
            </tr>
          )}
          {table?.cols.length !== 0 && (
            <tr>
              <th></th>
              {table?.cols.map((col, index) => {
                return (
                  <th
                    key={index}
                    scope="col"
                    colSpan={table?.colsColSpan[index]}
                  >
                    {col}
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        <tbody>
          {Array.isArray(tableWords) && tableWords.length !== 0
            ? tableWords.map((word, idx) => {
                return Array.isArray(word?.cases) ? (
                  <tr key={idx}>
                    <th scope="row">{table.rows[idx]}</th>
                    {table.cols.map((_, index) => {
                      return <td key={index}>{word.cases[index] ?? ""}</td>;
                    })}
                  </tr>
                ) : null;
              })
            : null}
        </tbody>
      </table>
      <div>{table?.notes}</div>
    </div>
  );
}
