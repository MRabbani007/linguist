import React, { useState } from "react";
import { useEditWordMutation } from "./wordsSlice";
import { BiCheck, BiX } from "react-icons/bi";
import { toast } from "react-toastify";

const initialState = {
  type: "",
  gender: "",
};

const WORD_TYPE = {
  v: "Verb",
  n: "Noun",
  p: "Pronoun",
  adj: "Adjective",
  adv: "Adverb",
  ph: "Phrase",
};

const WORD_GENDER = {
  m: "Masculine",
  f: "Feminine",
  n: "Neuter",
};

export default function CardWordType({ word, setEdit }) {
  const [editWord, { isLoading }] = useEditWordMutation();
  const [state, setState] = useState(word);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWord = {
        ...word,
        ...state,
      };
      await editWord(newWord).unwrap();
      toast.success("Word Saved");
      setEdit(false);
    } catch (err) {
      toast.error("Server Error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => setEdit(false)}
      className="absolute top-full left-0 bg-zinc-100 p-2 z-20"
    >
      <div className="flex items-center gap-2">
        {Object.keys(WORD_TYPE).map((item, index) => {
          return (
            <div className="flex items-center gap-1">
              <input
                key={index}
                type="radio"
                name="type"
                id={"type" + item}
                checked={state?.type === item}
                value={item}
                onChange={handleChange}
              />
              <label htmlFor={"type" + item}>{item}</label>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        {Object.keys(WORD_GENDER).map((item, index) => {
          return (
            <div className="flex items-center gap-1">
              <input
                key={index}
                type="radio"
                name="gender"
                id={"type" + item}
                checked={state?.gender === item}
                value={item}
                onChange={handleChange}
              />
              <label htmlFor={"gender" + item}>{item}</label>
            </div>
          );
        })}
      </div>
      <button type="submit">
        <BiCheck size={32} />
      </button>
      <button type="reset">
        <BiX size={32} />
      </button>
    </form>
  );
}
