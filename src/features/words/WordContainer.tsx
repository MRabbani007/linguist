import { ReactNode, useState } from "react";
import { IoStar } from "react-icons/io5";
import FormAddtoList from "./FormAddtoList";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useDeleteListWordMutation } from "../profile/profileSlice";
import { toast } from "react-toastify";
import { BiX } from "react-icons/bi";
import { motion } from "framer-motion";

export default function WordContainer({
  listID,
  wordData,
  children,
}: {
  listID?: string;
  wordData?: WordData | null;
  children: ReactNode;
}) {
  const user = useSelector(selectCurrentUser);

  const [addToList, setAddToList] = useState(false);
  const [deleteListWord] = useDeleteListWordMutation();

  const handleRemove = async () => {
    if (!listID) {
      return null;
    }

    if (!confirm("Remove word from this list?")) {
      return null;
    }

    try {
      await deleteListWord(wordData?.id);

      toast.success("Word removed from list");
    } catch (error) {
      toast.error("Error removing word from list");
    }
  };

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="relative group"
      >
        {user && (
          <>
            {wordData?.id ? (
              <button
                className="z-20 absolute bottom-1 left-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-100"
                onClick={handleRemove}
              >
                <BiX size={25} className="text-red-400" />
              </button>
            ) : (
              <button
                className="z-20 absolute bottom-1 left-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-100"
                onClick={() => setAddToList(true)}
              >
                <IoStar size={25} className="text-yellow-400" />
              </button>
            )}
          </>
        )}
        {children}
      </motion.div>
      {user && addToList && (
        <FormAddtoList setAdd={setAddToList} words={[]} wordLists={[]} />
      )}
    </>
  );
}
