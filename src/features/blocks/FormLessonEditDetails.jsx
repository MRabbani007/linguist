import { useState } from "react";
import { useEditBlockDetailsMutation } from "./blockSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function FormLessonEditDetails({ lesson, setEdit }) {
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
        id: lesson?.id,
        firstLang,
        secondLang,
        thirdLang,
        fourthLang,
        imagesURL,
      };
      await editBlockDetails(newBlock).unwrap();

      toast.success("Lesson Saved");
      setEdit(false);
    }
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Lesson Details"
      submitButton="Save Lesson"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field_group">
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
            Second Language
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
      <div className="field_group">
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
      <div className="field_group">
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
    </FormContainer>
  );
}
