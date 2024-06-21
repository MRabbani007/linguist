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
      <div className="grid grid-cols-2">
        <span>{count?.chaptersCount}</span>
        <span>chapters</span>
        <span>{count?.lessonsCount}</span>
        <span>lessons</span>
        <span>{count?.sectionsCount}</span>
        <span>sections</span>
        <span>{count?.wordsCount}</span>
        <span>words</span>
        <span>{count?.sentenceCount}</span>
        <span>sentences</span>
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
