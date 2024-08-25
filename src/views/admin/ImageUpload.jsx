import React, { useEffect, useRef, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  getFirestore,
  doc,
} from "firebase/firestore";
import { BiCheck, BiImageAdd, BiX } from "react-icons/bi";
import { getFiles, uploadFile } from "../../data/storage";
import { useDebounce } from "use-debounce";
import { IoArrowBack, IoFolderOutline } from "react-icons/io5";
import { FiFolderPlus } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useDropzone } from "react-dropzone";

export async function fetchDB() {
  try {
    // collection ref
    const colRef = collection(firestoreDB, "images");

    // get collection data
    const snapshot = await getDocs(colRef);

    let images = [];

    snapshot.docs.forEach((doc) => {
      images.push({ ...doc.data(), id: doc.id });
    });

    return images;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteImage(imageDoc) {
  try {
    // collection ref
    const colRef = collection(firestoreDB, "images");

    const docRef = doc(firestoreDB, "images", imageDoc.id);
    // getDoc();

    // Create a reference to the file to delete
    const storageRef = ref(
      firebaseStorage,
      `${imageDoc.foldername}/${imageDoc.filename}`
    );

    // Delete the file
    await deleteObject(storageRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

    await deleteDoc(docRef);

    toast.success("image deleted");
  } catch (error) {
    console.error(error);
    toast.error("error deleting");
  }
}

export default function ImageUpload() {
  const inputRef = useRef(null);

  const [files, setFiles] = useState(null);
  const [foldername, setFoldername] = useState("images/lessons");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });
  const [addFolder, setAddFolder] = useState(false);

  const [newFolder, setNewFolder] = useState("");

  const [value] = useDebounce(foldername, 1000);

  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);

  // open file select
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // select files to upload
  const handleSelect = (e) => {
    // e.preventDefault();

    const myFiles = e.target.files ?? null;

    // const formData = new FormData();

    // Object.keys(myFiles).forEach((key) => {
    //   formData.append(myFiles.item(key).name, myFiles.item(key));
    // });

    setFiles(myFiles);
  };

  const handleRemove = (key) => {
    console.log(key, files);
    // || confirm("Remove this image?")
    if (false) {
      setFiles((curr) => {
        if (curr) {
          delete curr[key];
          return { ...curr };
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files) return;

    const promises = Object.keys(files).map((fileKey, index) => {
      return uploadFile(files[fileKey], foldername);
    });

    await Promise.all(promises);

    setFiles(null);
    toast.success("Images uploaded");

    // await axiosPrivate
    //   .post("/admin/images", files, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       toast.success("Files uploaded");
    //     }
    //   })
    //   .catch((e) => {
    //     toast.error("Error uploadng files");
    //   });
  };

  const handleFetch = async () => {
    // await axiosPrivate.get("/admin/images").then((response) => {
    //   if (response.status === 200 && Array.isArray(response?.data)) {
    //     setImages(response.data);
    //   }
    // });

    // await getImages()
    //   .then((data) => {
    //     if (Array.isArray(data)) {
    //       setImages(data);
    //     }
    //   })
    //   .catch((error) => console.log(error));

    const response = await getFiles(value);
    setImages(response.files);
    setFolders(response.folders);
  };

  const handleDelete = async (image) => {
    if (confirm("Delete this image?")) {
      await deleteFile(image);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [value, files]);

  const isRoot = foldername === "" || foldername === "/";

  const handleBack = () => {
    if (foldername === "" || foldername === "/") return;

    const pathname = foldername.split("/");
    pathname.splice(-1, 1);
    setFoldername(pathname.join("/"));
  };

  const handleAddFolder = (e) => {
    e.preventDefault();
    setFoldername((curr) => {
      const currPath = curr.split("/");
      const temp = newFolder.split("/");
      return [...currPath, ...temp].join("/");
    });
    setAddFolder(false);
  };

  const resetAddFolder = () => {
    setAddFolder(false);
  };

  let imagePreview;

  if (files) {
    imagePreview = Object.keys(files).map((key, index) => (
      <div
        key={index}
        title={files[key].name}
        className={"flex flex-col items-center justify-center relative group"}
      >
        <img src={URL.createObjectURL(files[key])} className={"w-20 flex-1 "} />
        {/* <p>{files[key].name}</p> */}
        <button
          title="Remove image"
          className="absolute top-0 right-0  opacity-0 group-hover:opacity-100 invisible group-hover:visible duration-200"
          onClick={() => handleRemove(key)}
        >
          <BiX size={24} />
        </button>
      </div>
    ));
  }

  return (
    <>
      <div className="flex items-center gap-4 self-stretch p-2 bg-slate-200 z-10">
        <button disabled={isRoot} onClick={handleBack}>
          <IoArrowBack size={24} />
        </button>
        <div className="flex items-center gap-2">
          {foldername.split("/").map((folder, index) => (
            <>
              <span
                key={index}
                className="cursor-pointer"
                onClick={() =>
                  setFoldername((curr) =>
                    curr
                      .split("/")
                      .slice(0, index + 1)
                      .join("/")
                  )
                }
              >
                {folder}
              </span>
              <IoIosArrowForward key={"arrow" + index} />
            </>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 self-stretch p-2 bg-slate-200">
        <button
          onClick={() => setAddFolder(true)}
          title="New Folder"
          className="flex items-center gap-2"
        >
          <FiFolderPlus size={24} />
          <span>New Folder</span>
        </button>
        {addFolder ? (
          <form
            className="flex items-center"
            onSubmit={handleAddFolder}
            onReset={resetAddFolder}
          >
            <input
              type="text"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              className={(addFolder ? "w-52" : "w-0") + " bg-transparent"}
            />
            <button type="submit">
              <BiCheck size={24} />
            </button>
            <button type="reset">
              <BiX size={24} />
            </button>
          </form>
        ) : null}
        <button
          title="Add Images"
          onClick={handleClick}
          className="flex items-center gap-2"
        >
          <BiImageAdd size={24} />
          <span>Add Images</span>
        </button>
      </div>
      <div className="flex flex-wrap items-start gap-4">
        {folders.map((item, index) => (
          <div
            key={index}
            onClick={() => setFoldername(item?.fullPath)}
            className="flex flex-col items-center"
          >
            <IoFolderOutline size={50} />
            <span>{item.name}</span>
          </div>
        ))}
        {images.map((item, index) => (
          <div key={index} className="relative group">
            <img
              src={item?.imageURL}
              alt={item?.filename}
              className="w-24 h-24"
            />
            <button
              className="absolute top-0 right-0 invisible opacity-0 group-hover:opacity-100 group-hover:visible duration-200"
              title="Delete Image"
              onClick={() => handleDelete(item)}
            >
              <BiX size={30} />
            </button>
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        className="w-full p-10 border-2 border-dashed border-zinc-600 flex flex-col gap-4 items-center"
      >
        <div className="flex flex-wrap items-stretch gap-4">{imagePreview}</div>
        <input {...getInputProps()} />
        <p className="w-fit mx-auto">
          Drag and drop files here or click to browse.
        </p>
        {/* <ul>
            {files && files.map((file) => <li key={file.name}>{file.name}</li>)}
          </ul> */}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
        <input
          type="file"
          ref={inputRef}
          onChange={handleSelect}
          accept="image/*"
          multiple
          className="hidden"
        />
        <button className="btn btn-red w-fit mx-auto">Upload</button>
      </form>
    </>
  );
}
