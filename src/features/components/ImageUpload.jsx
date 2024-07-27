import React, { useState } from "react";

export default function ImageUpload({ folderName }) {
  const [files, setFiles] = useState(null);

  const handleSelect = (event) => {
    if (!event.target.files) return;

    setFiles(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <input type="file" multiple onChange={handleSelect} />
    </div>
  );
}
