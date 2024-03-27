import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useEditBlockDetailsMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";

const CardBlockEditDetails = ({ editBlockTab, toggleEdit }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const [editBlockDetails, { isLoading }] = useEditBlockDetailsMutation();

  const [firstLang, setFirstLang] = useState(displayBlock?.firstLang || "");
  const [secondLang, setSecondLang] = useState(displayBlock?.secondLang || "");
  const [thirdLang, setThirdLang] = useState(displayBlock?.thirdLang || "");
  const [fourthLang, setFourthLang] = useState(displayBlock?.fourthLang || "");

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newBlock = {
          ...displayBlock,
          firstLang,
          secondLang,
          thirdLang,
          fourthLang,
        };
        await editBlockDetails(newBlock).unwrap();

        toggleEdit("");
      } catch (err) {
        console.error("Failed to save the chapter", err);
      }
    }
  };

  const handleReset = () => {
    toggleEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={
        editBlockTab === "details"
          ? "flex flex-col justify-center items-center gap-2 visible translate-y-0 dur"
          : "invisible -translate-y-3 h-0"
      }
    >
      <h2 className="btn btn-yellow">Edit Header</h2>
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
        <button type="submit">
          <CiSquarePlus className="icon text-green-600" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon text-red-600" />
        </button>
      </div>
    </form>
  );
};

export default CardBlockEditDetails;
