import React from "react";
import { useGetAllCountQuery } from "../../features/admin/adminApiSlice";

const AdminPage = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllCountQuery();

  console.log();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const count = data.entities[data.ids[0]].responseData;
    content = (
      <div>
        <p>{count.chaptersCount + " chapters"}</p>
        <p>{count.lessonsCount + " lessons"}</p>
        <p>{count.sectionsCount + " sections"}</p>
        <p>{count.wordsCount + " words"}</p>
        <p>{count.sentencesCount + " sentences"}</p>
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
