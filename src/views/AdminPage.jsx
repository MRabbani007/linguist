import React from "react";
import EditorBlocks from "../features/editor/EditorBlocks";
import EditorChapters from "../features/editor/EditorChapters";

const AdminPage = () => {
  return (
    <div className="">
      <h1>AdminPage</h1>
      <EditorChapters />
      <EditorBlocks />
    </div>
  );
};

export default AdminPage;
