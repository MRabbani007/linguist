import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDropzone } from "react-dropzone";
import UploadProgressBar from "../components/UploadProgressBar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectDisplayLesson } from "../globals/globalsSlice";
import { useEditWordMutation } from "./wordsSlice";

export default function FormWordImage({
  word,
  type,
  setShowForm,
}: {
  word: Word;
  type: "add" | "edit";
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [editWordDetails] = useEditWordMutation();
  const displayBlock = useSelector(selectDisplayLesson);

  const [file, setFile] = useState<File | null>(null);
  const foldername =
    "images/words/" +
    (displayBlock?.title ? displayBlock?.title.split(" ")[0] : "/common");
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
        className="min-h-32 h-[60vh] border-2 border-dashed border-zinc-600 flex flex-col gap-4 items-center justify-center"
      >
        <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              className="h-full object-fill"
            />
          ) : url ? (
            <img src={url} className={"h-full object-fill"} />
          ) : word?.imageURL ? (
            <img src={word?.imageURL} className={"h-full object-fill"} />
          ) : (
            <p className="">Drag and drop files here or click to browse.</p>
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
