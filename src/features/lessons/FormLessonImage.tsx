import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { uploadFile } from "../../data/storage";
import { BiCheck, BiImageAdd, BiX } from "react-icons/bi";
import { useEditLessonMutation } from "./lessonSlice";

export default function FormLessonImage({ lesson }: { lesson: Lesson }) {
  const [editLesson] = useEditLessonMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [lessonImage, setlessonImage] = useState("");

  // open file select
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // select files
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // remove file
  const handleRemove = () => {
    setFile(null);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) return;
    try {
      const { imageURL } = await uploadFile({
        file,
        foldername: "images/lessons",
      });

      setlessonImage(imageURL);

      await editLesson({
        type: "EDIT_IMAGE",
        payload: { id: lesson?.id, lessonImage: imageURL },
      });

      setFile(null);
    } catch (error) {
      console.log("Error uploading image");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {file === null ? (
        <button type="button" title="Add Images" onClick={handleClick}>
          <BiImageAdd size={40} />
        </button>
      ) : (
        <div className="flex flex-col relative">
          <img src={URL.createObjectURL(file)} className={"w-20 flex-1"} />
          <p>{file?.name}</p>
          <div className="flex items-center gap-4">
            <button type="submit" className="absolute bottom-2 left-2">
              <BiCheck size={24} />
            </button>
            <button
              type="button"
              className="absolute bottom-2 right-2"
              onClick={handleRemove}
            >
              <BiX size={24} />
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={handleSelect}
        className="hidden"
        multiple
      />
      {lessonImage && null}
    </form>
  );
}
