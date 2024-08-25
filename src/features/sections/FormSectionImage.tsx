import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDropzone } from "react-dropzone";
import UploadProgressBar from "../components/UploadProgressBar";
import { useEditSectionHeaderMutation } from "./sectionSlice";
import { toast } from "react-toastify";
import { Section } from "../../types/types";

interface Props {
  section: Section;
  type: "add" | "edit";
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function FormSectionImage({
  section,
  type,
  setShowForm,
}: Props) {
  const [editSectionHeader, { isLoading }] = useEditSectionHeaderMutation();

  const [file, setFile] = useState<File | null>(null);
  const [foldername, setFoldername] = useState("images/sections");
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
      await editSectionHeader({ ...section, image: url, caption: "" });
      toast.success("Image saved");
      setShowForm(false);
    }
  };

  const onDelete = async () => {
    await editSectionHeader({ ...section, image: "", caption: "" });
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
          ) : section?.image ? (
            <img
              src={section?.image}
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
