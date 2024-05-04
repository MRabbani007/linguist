import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useEditBlockDetailsMutation } from "./blockSlice";

const LessonEditDetails = ({ lesson, setEdit }) => {
  const [editBlockDetails, { isLoading }] = useEditBlockDetailsMutation();

  const [firstLang, setFirstLang] = useState(lesson?.firstLang || "");
  const [secondLang, setSecondLang] = useState(lesson?.secondLang || "");
  const [thirdLang, setThirdLang] = useState(lesson?.thirdLang || "");
  const [fourthLang, setFourthLang] = useState(lesson?.fourthLang || "");

  const [imagesURL, setImagesURL] = useState(lesson?.imagesURL || "");

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      let newBlock = {
        ...displayBlock,
        firstLang,
        secondLang,
        thirdLang,
        fourthLang,
        imagesURL,
      };
      await editBlockDetails(newBlock).unwrap();

      setEdit(false);
    }
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col justify-center items-center gap-2"
    >
      <div className="flex gap-2">
        <div className="field">
          <label htmlFor="section_firstLang" className="field__label">
            First Language
          </label>
          <input
            type="text"
            id="section_firstLang"
            name="section_firstLang"
            value={firstLang}
            placeholder="First Language"
            className="field__input"
            onChange={(e) => setFirstLang(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="section_secondLang" className="field__label">
            Section Sub-Title
          </label>
          <input
            type="text"
            id="section_secondLang"
            name="section_secondLang"
            value={secondLang}
            placeholder="Second Language"
            className="field__input"
            onChange={(e) => setSecondLang(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="field">
          <label htmlFor="section_thirdLang" className="field__label">
            Third Language
          </label>
          <input
            type="text"
            id="section_thirdLang"
            name="section_thirdLang"
            value={thirdLang}
            placeholder="Third Language"
            className="field__input"
            onChange={(e) => setThirdLang(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="section_fourthLang" className="field__label">
            Fourth Language
          </label>
          <input
            type="text"
            id="section_fourthLang"
            name="section_fourthLang"
            value={fourthLang}
            placeholder="Fourth Language"
            className="field__input"
            onChange={(e) => setFourthLang(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="field">
          <label htmlFor="lesson_imagesURL" className="field__label">
            Images URL
          </label>
          <input
            type="text"
            id="lesson_imagesURL"
            name="lesson_imagesURL"
            value={imagesURL}
            placeholder="Images URL"
            className="field__input"
            onChange={(e) => setImagesURL(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit">
          <CiSquarePlus size={32} className="text-green-600" />
        </button>
        <button type="reset">
          <CiSquareRemove size={32} className="text-red-600" />
        </button>
      </div>
    </form>
  );
};

export default LessonEditDetails;
