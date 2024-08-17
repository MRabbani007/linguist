import React, { useEffect, useState } from "react";
import { Dialogue } from "../../types/types";
import { axiosPrivate } from "../../api/axios";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export default function DialogueNavigator() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state?.id;
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [index, setIndex] = useState(0);

  const fetchDialogues = async () => {
    const response = await axiosPrivate.get("/dialogue");

    if (response.status === 200 && Array.isArray(response.data)) {
      setDialogues(response.data);
    }
  };

  useEffect(() => {
    fetchDialogues();
  }, []);

  useEffect(() => {
    if (dialogues && id) {
      const temp = dialogues.findIndex((item) => item.id === id);
      if (temp >= 0) {
        setIndex(temp);
      }
    }
  }, [location.state, dialogues]);

  const handleNext = () => {
    if (index < dialogues.length) {
      navigate(
        { pathname: "/content/dialogue/id" },
        { state: { id: dialogues[index + 1].id } }
      );
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      // setIndex((curr) => curr - 1);
      navigate(
        { pathname: "/content/dialogue/id" },
        { state: { id: dialogues[index - 1].id } }
      );
    }
  };

  return (
    <div className="flex items-center justify-between">
      <button onClick={handlePrev} className="flex items-center gap-2">
        <IoChevronBack size={24} />
        <span>Previous</span>
      </button>
      <button onClick={handleNext} className="flex items-center gap-2">
        <span>Next</span>
        <IoChevronForward size={24} />
      </button>
    </div>
  );
}
