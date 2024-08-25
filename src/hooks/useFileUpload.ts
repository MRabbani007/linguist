import { addDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { storage } from "../data/storage";
import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from "firebase/storage";

interface Props {
  file: File | null;
  foldername: string;
}

export default function useFileUpload({ file, foldername }) {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<StorageError | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const filename = file.name;

      const storageRef = ref(storage, `${foldername}/${filename}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  }, [file]);

  return { progress, url, error };
}
