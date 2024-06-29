import React, { useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { toast } from "react-toastify";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    await axiosPrivate
      .post("/admin/images", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Files uploaded");
        }
      })
      .catch((e) => {
        toast.error("Error uploadng files");
      });
  };

  const getFileInfo = (e) => {
    // e.preventDefault();
    console.log(e.target.files);

    const myFiles = e.target.files;

    const formData = new FormData();

    Object.keys(myFiles).forEach((key) => {
      formData.append(myFiles.item(key).name, myFiles.item(key));
    });

    setImage(formData);
  };

  return (
    <main>
      <div>
        <img src={"http://localhost:3000/img/baguette.png"} className="w-28" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
          <input type="file" onChange={getFileInfo} accept="image/*" multiple />
          <button className="btn btn-red w-fit mx-auto">Submit</button>
        </form>
      </div>
    </main>
  );
}
