import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import { IoArrowBack, IoFolderOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setImageFolder, setImagesFetch } from "../admin/adminSlice";
import { IoIosArrowForward } from "react-icons/io";
import { useEditWordMutation } from "./wordsSlice";
import { getFiles } from "@/data/storage";

// const imageFileTypes = ["png", "svg", "jpg", "jpeg"];

export default function WordImageEdit({
  word,
  setEdit,
}: {
  word: Word;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  // const lastFetch = useSelector(selectImagesFetch);
  // const pathname = useSelector(selectImageFolder);

  const [foldername, setFoldername] = useState("images"); //pathname ||

  const [images, setImages] = useState<FileMeta[]>([]);
  const [folders, setFolders] = useState<FolderMeta[]>([]); //lastFetch?.folders ||

  const [editWordDetails] = useEditWordMutation();

  const [image, setImage] = useState(word?.imageURL || "");
  // const [fileType, setFileType] = useState(() =>
  //   word?.image ? word?.image.split(".")[1] : "png"
  // );
  // const [input, setInput] = useState("");

  const canSave = image !== "";
  // fileType === "other" ? input !== "" : true;

  const handleBack = () => {
    if (foldername === "" || foldername === "/") return;

    const pathname = foldername.split("/");
    pathname.splice(-1, 1);
    setFoldername(pathname.join("/"));
  };

  const handleFetch = async () => {
    const response = await getFiles(foldername);
    setImages(response.files);
    setFolders(response.folders);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (canSave) {
        // const newImage = fileType === "other" ? input : fileType;: image + "." + newImage
        const newWord = { ...word, imageURL: image };

        await editWordDetails(newWord).unwrap();

        dispatch(setImageFolder(foldername));
        dispatch(setImagesFetch({ images, folders }));

        toast.success("Word Saved");
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const isRoot = foldername === "" || foldername === "/";

  return (
    <FormContainer
      title="Edit Word Image"
      type="edit"
      submitButton="Save Image"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="flex items-center gap-4 self-stretch p-2 bg-slate-200 z-10">
        <button type="button" disabled={isRoot} onClick={handleBack}>
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
          <img
            key={index}
            src={item?.imageURL}
            alt={item?.filename}
            className={
              (image === item?.imageURL ? "border-2 border-yellow-400" : "") +
              " w-24 h-24"
            }
            onClick={() => setImage(item?.imageURL)}
          />
        ))}
      </div>
      <div className="hidden">
        <label htmlFor="image_url" className="field__label">
          Image URL
        </label>
        <input
          type="text"
          title="Image"
          id="image_url"
          name="image_url"
          placeholder="Image"
          autoFocus
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="field__input"
        />
      </div>
      <div className="hidden items-center gap-3">
        {/* {imageFileTypes.map((type, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <input
                id={"file_type_" + type}
                type="radio"
                name="file_type"
                checked={fileType === type}
                value={type}
                onChange={(e) => setFileType(e.target.value)}
              />
              <label htmlFor={"file_type_" + type}>{type}</label>
            </div>
          );
        })} */}
        {/* <div className="flex items-center gap-2">
          <input
            id={"file_type_other"}
            type="radio"
            name="file_type"
            checked={fileType === "other"}
            value={"other"}
            onChange={(e) => setFileType(e.target.value)}
          />
          <label htmlFor={"file_type_other"}>Other</label>
        </div> */}
        {/* <div
          className={
            (fileType === "other"
              ? "field"
              : "opacity-0 invisible -translate-x-4") + " duration-200"
          }
        >
          <label htmlFor={"file_type_input"} className="field__label">
            File Type
          </label>
          <input
            id={"file_type_input"}
            type="text"
            placeholder="Image File Type"
            className="field__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div> */}
      </div>
    </FormContainer>
  );
}
