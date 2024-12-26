import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetDialoguesQuery } from "../globals/globalsApiSlice";

export default function DialogueNavigator() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;

  const [getDialogues, { data: dialogues }] = useLazyGetDialoguesQuery();

  // if (!dialogues) return null;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    getDialogues(null);
  }, []);

  useEffect(() => {
    if (dialogues && id) {
      const temp = dialogues.findIndex((item) => item.id === id);
      if (temp >= 0) {
        setIndex(temp);
      }
    }
  }, [id, dialogues]);

  const handleNext = () => {
    if (dialogues && index < dialogues.length) {
      navigate(`/content/dialogue/${dialogues[index + 1].id}`);
    }
  };

  const handlePrev = () => {
    if (dialogues && index > 0) {
      navigate(`/content/dialogue/${dialogues[index - 1].id}`);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <button
        disabled={index === 0}
        onClick={handlePrev}
        className="btn-r btn-red flex items-center gap-2"
      >
        <IoChevronBack size={25} />
        <span>Previous</span>
      </button>
      <button
        disabled={dialogues ? index === dialogues.length : true}
        onClick={handleNext}
        className="btn-r btn-red flex items-center gap-2"
      >
        <span>Next</span>
        <IoChevronForward size={25} />
      </button>
    </div>
  );
}
