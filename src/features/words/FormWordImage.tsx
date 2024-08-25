import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDropzone } from "react-dropzone";
import UploadProgressBar from "../components/UploadProgressBar";
import { toast } from "react-toastify";
import { Word } from "../../types/types";
import { useEditWordDetailsMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";

interface Props {
  word: Word;
  type: "add" | "edit";
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function FormWordImage({ word, type, setShowForm }: Props) {
  const [editWordDetails, { isLoading }] = useEditWordDetailsMutation();
  const displayBlock = useSelector(selectDisplayBlock);

  const [file, setFile] = useState<File | null>(null);
  const [foldername, setFoldername] = useState(
    "images/words/" +
      (displayBlock?.title ? displayBlock?.title.split(" ")[0] : "/common")
  );
  const [url, setURL] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const canSave = url !== null;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        await editWordDetails({ ...word, imageURL: url }).unwrap();

        toast.success("Image saved");
        setShowForm(false);
      } catch (error) {
        toast.error("Error Saving Image");
      }
    }
  };

  const onDelete = async () => {
    await editWordDetails({ ...word, imageURL: "" }).unwrap();
    toast.success("Image Removed");
  };

  return (
    <FormContainer
      type={type}
      title="Section Image"
      deleteButton={type === "edit"}
      onSubmit={onSubmit}
      onDelete={onDelete}
      closeForm={setShowForm}
    >
      <div
        {...getRootProps()}
        className="w-full h-full flex-1 border-2 border-dashed border-zinc-600 flex flex-col gap-4 items-center"
      >
        <div className="w-full h-full overflow-hidden flex items-center">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-full object-fill"
            />
          ) : url ? (
            <img src={url} className={"w-full h-full object-cover"} />
          ) : word?.imageURL ? (
            <img
              src={word?.imageURL}
              className={"w-full h-full object-cover"}
            />
          ) : (
            <p className="w-fit mx-auto my-auto">
              Drag and drop files here or click to browse.
            </p>
          )}
        </div>
        <input {...getInputProps()} />
      </div>
      {!url && (
        <UploadProgressBar
          file={file}
          setFile={setFile}
          setURL={setURL}
          foldername={foldername}
        />
      )}
    </FormContainer>
  );
}
