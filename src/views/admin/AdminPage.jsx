import React from "react";
import { useGetAllCountQuery } from "../../features/admin/adminApiSlice";

const AdminPage = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllCountQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const count = data.entities[data.ids[0]].responseData;
    content = (
      <div className="flex flex-wrap items-center gap-2">
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-lime-300 rounded-md font-medium">
          <span>chapters</span>
          <span>{count?.chaptersCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-lime-300 rounded-md font-medium">
          <span>lessons</span>
          <span>{count?.lessonsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-lime-300 rounded-md font-medium">
          <span>sections</span>
          <span>{count?.sectionsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-lime-300 rounded-md font-medium">
          <span>words</span>
          <span>{count?.wordsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-lime-300 rounded-md font-medium">
          <span>sentences</span>
          <span>{count?.sentenceCount}</span>
        </p>
      </div>
    );
  }
  return (
    <main>
      <header>
        <h1>Admin Page</h1>
      </header>
      <div>{content}</div>
    </main>
  );
};

export default AdminPage;
