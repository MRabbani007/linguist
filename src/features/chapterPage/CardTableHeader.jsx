import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  CiCircleRemove,
  CiEdit,
  CiSquareCheck,
  CiSquareRemove,
} from "react-icons/ci";
import { IoAdd } from "react-icons/io5";

const CardTableHeader = ({ colSpan, setColSpan, displayBlock }) => {
  const { handleBlockEditDetail, handleBlockClose } = useContext(GlobalContext);

  const [edit, setEdit] = useState(false);
  const [firstLang, setFirstLang] = useState(() => {
    if (!!displayBlock?.firstLang) {
      return displayBlock.firstLang;
    } else {
      return "";
    }
  });
  const [secondLang, setSecondLang] = useState(() => {
    if (!!displayBlock?.secondLang) {
      return displayBlock?.secondLang;
    } else {
      return "";
    }
  });
  const [thirdLang, setThirdLang] = useState(displayBlock?.thirdLang || "");
  const [fourthLang, setFourthLang] = useState(displayBlock?.fourthLang || "");

  const saveEdit = () => {
    handleBlockEditDetail(
      displayBlock.id,
      firstLang,
      secondLang,
      thirdLang,
      fourthLang
    );
    setEdit(false);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const addLanguage = () => {
    if (colSpan === 4) {
      setThirdLang("Third Language");
      setColSpan(5);
      handleBlockEditDetail(
        displayBlock.id,
        firstLang,
        secondLang,
        thirdLang,
        fourthLang
      );
    } else if (colSpan === 5) {
      setFourthLang("Fourth Language");
      setColSpan(6);
      handleBlockEditDetail(
        displayBlock.id,
        firstLang,
        secondLang,
        thirdLang,
        fourthLang
      );
    }
  };

  const handleDeleteCol = (colIndex) => {};

  return (
    <thead>
      {edit ? (
        <>
          <tr>
            <th colSpan={colSpan} className="">
              <span className="text-xl w-full text-center">
                {displayBlock?.title || ""}
              </span>
              <CiSquareCheck
                className="icon"
                onClick={() => {
                  saveEdit();
                }}
              />
              <CiSquareRemove
                className="icon"
                onClick={() => {
                  cancelEdit();
                }}
              />
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>
              <div className="flex items-center justify-center w-fit border-2">
                <input
                  type="text"
                  placeholder="First Language"
                  className="field__input"
                  value={firstLang}
                  onChange={(e) => setFirstLang(e.target.value)}
                />
                <CiSquareRemove
                  className="icon"
                  onClick={() => {
                    cancelEdit();
                  }}
                />
              </div>
            </th>
            <th>
              <div className="flex items-center justify-center w-fit">
                <input
                  type="text"
                  placeholder="Second Language"
                  className="field__input"
                  value={secondLang}
                  onChange={(e) => setSecondLang(e.target.value)}
                />
                <CiSquareRemove
                  className="icon"
                  onClick={() => {
                    cancelEdit();
                  }}
                />
              </div>
            </th>
            {colSpan > 4 ? (
              <th>
                <div className="flex items-center justify-center w-fit">
                  <input
                    type="text"
                    placeholder="Third Language"
                    className="field__input"
                    value={thirdLang}
                    onChange={(e) => setThirdLang(e.target.value)}
                  />
                  <CiSquareRemove
                    className="icon"
                    onClick={() => {
                      cancelEdit();
                    }}
                  />
                </div>
              </th>
            ) : null}
            {colSpan > 5 ? (
              <th>
                <div className="flex items-center justify-center w-fit">
                  <input
                    type="text"
                    placeholder="Fourth Language"
                    className="field__input"
                    value={fourthLang}
                    onChange={(e) => setFourthLang(e.target.value)}
                  />
                  <CiSquareRemove
                    className="icon"
                    onClick={() => {
                      cancelEdit();
                    }}
                  />
                </div>
              </th>
            ) : null}
            <th>Edit</th>
          </tr>
        </>
      ) : (
        <>
          <tr>
            <th colSpan={colSpan} className="group">
              <span>{displayBlock.title}</span>
              <span className="invisible group-hover:visible">
                <CiEdit
                  className="icon"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
                <CiCircleRemove
                  className="icon"
                  onClick={() => {
                    handleBlockClose(displayBlock.id);
                  }}
                />
              </span>
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>
              <span>{displayBlock?.firstLang}</span>
            </th>
            <th>
              <span>{displayBlock?.secondLang}</span>
            </th>
            {colSpan > 4 ? (
              <th>
                <span>{displayBlock?.thirdLang}</span>
              </th>
            ) : null}
            {colSpan > 5 ? (
              <th>
                <span>{displayBlock?.fourthLang}</span>
              </th>
            ) : null}
            {colSpan > 5 ? (
              <th>
                <span>Edit</span>
              </th>
            ) : (
              <th>
                <IoAdd className="icon" onClick={addLanguage} />
              </th>
            )}
          </tr>
        </>
      )}
    </thead>
  );
};

export default CardTableHeader;
