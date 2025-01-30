import { initializeApp } from "firebase/app";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUdk3pT127JwPF28wQkywvZ-o9O9Ijz9s",
  authDomain: "lingo007.firebaseapp.com",
  databaseURL: "https://lingo007-default-rtdb.firebaseio.com",
  projectId: "lingo007",
  storageBucket: "lingo007.appspot.com",
  messagingSenderId: "828972046002",
  appId: "1:828972046002:web:3f4c72c796de9e8f305bab",
  measurementId: "G-4C5Y7Y3W5D",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(firebase);

export const storage = getStorage(firebase);

export async function getFiles(foldername: string) {
  // Create a reference under which you want to list
  const listRef = ref(storage, foldername);

  // Find all the prefixes and items.
  const res = await listAll(listRef);
  // .then((res) => {
  //   res.prefixes.forEach((folderRef) => {
  //     // All the prefixes under listRef.
  //     // You may call listAll() recursively on them.
  //   });
  //   res.items.forEach((itemRef) => {
  //     // All the items under listRef.
  //   });
  // })
  // .catch((error) => {
  //   // Uh-oh, an error occurred!
  // });

  const files: FileMeta[] = [];

  const promises = res.items.map(async (item) => {
    const imageURL = await getDownloadURL(item);
    files.push({ imageURL, filename: item.name, foldername });
  });

  const folders = res.prefixes.map((item) => {
    return { name: item.name, fullPath: item.fullPath };
  });

  await Promise.all(promises);

  return { files, folders };
}

export async function uploadFile({
  foldername,
  file,
}: {
  foldername: string;
  file: File;
}) {
  const filename = file.name;
  // create reference
  const storageRef = ref(storage, `${foldername}/${filename}`);

  // upload file
  const res = await uploadBytes(storageRef, file);

  const path = res.metadata.fullPath;

  // create file reference
  const fileRef = ref(storage, path);

  // get download url
  const imageURL = await getDownloadURL(fileRef);

  return {
    foldername,
    filename,
    imageURL,
  };
}

export async function deleteFile({
  foldername,
  filename,
}: {
  foldername: string;
  filename: string;
}) {
  console.log(foldername, filename);
  // Create a reference to the file to delete
  const storageRef = ref(storage, `${foldername}/${filename}`);

  // Delete the file
  await deleteObject(storageRef);
}
