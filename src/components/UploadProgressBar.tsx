import { Dispatch, SetStateAction, useEffect } from "react";
import useFileUpload from "../hooks/useFileUpload";
import { motion } from "framer-motion";

interface Props {
  foldername: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  setURL: Dispatch<SetStateAction<string | null>>;
}

export default function UploadProgressBar({
  file,
  setFile,
  foldername,
  setURL,
}: Props) {
  const { progress, url } = useFileUpload({ file, foldername });

  useEffect(() => {
    if (url) {
      setURL(url);
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="min-h-4 bg-green-600"
      style={{ width: progress + "%" }}
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
}
