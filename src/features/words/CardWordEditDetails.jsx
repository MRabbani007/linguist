import { useEffect, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordDetailsMutation } from "./wordsSlice";

const CardWordEditDetails = ({ word, colSpan, editWord, setEditWord }) => {
  const [editWordDetails, { isLoading }] = useEditWordDetailsMutation();

  const [image, setImage] = useState(word?.image || "");
  const [sentence, setSentence] = useState(word?.sentence || "");
  const [baseWord, setBaseWord] = useState(word?.baseWord || "");

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const newWord = { ...word, image, sentence, baseWord };

        await editWordDetails(newWord).unwrap();

        setEditWord(false);
      } catch (err) {
        console.error("Failed to save the word", err);
      }
    }
  };

  const handleReset = () => {
    setEditWord(false);
  };

  useEffect(() => {
    setImage(word?.image || "");
    setSentence(word?.sentence || "");
    setBaseWord(word?.baseWord || "");
  }, [word]);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col gap-2"
    >
      <h3 className="bg-yellow-500 py-2 px-4 rounded-lg font-semibold">
        Edit Word Details
      </h3>
      <div className="flex gap-2 items-center">
        <div className="field">
          <label htmlFor="edit_firstword" className="field__label">
            Image
          </label>
          <input
            type="text"
            id="edit_image"
            name="edit_image"
            placeholder="Image"
            autoFocus
            className="field__input"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="edit_sentence" className="field__label">
            Sentence
          </label>
          <input
            type="text"
            id="edit_sentence"
            name="edit_sentence"
            className="field__input"
            placeholder="Sentence"
            value={sentence}
            onChange={(e) => {
              setSecond(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center my-1">
        <button type="submit">
          <CiSquareCheck className="icon" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon" />
        </button>
      </div>
    </form>
  );
};

export default CardWordEditDetails;
