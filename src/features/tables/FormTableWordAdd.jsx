import React, { useState } from "react";
import { useAddTableWordMutation } from "../tableWords/tableWordsSlice";
import { toast } from "react-toastify";

export default function FormTableWordAdd({ table, index = 99, setAdd }) {
  const [addTableWord, { isLoading }] = useAddTableWordMutation();

  const [sortIndex, setSortIndex] = useState(index);
  const [wordCases, setWordCases] = useState(
    new Array(table.cols.length).fill("")
  );
  const [wordTranslation, setWordTranslation] = useState(
    new Array(table.cols.length).fill("")
  );
  const [wordPronunce, setWordPronunce] = useState(
    new Array(table.cols.length).fill("")
  );

  const handleChange = (type, idx, payload) => {
    if (type === "cases") {
      setWordCases((curr) => {
        const temp = [...curr];
        temp.splice(idx, 1, payload);
        return temp;
      });
    }
    if (type === "translation") {
      setWordTranslation((curr) => {
        const temp = [...curr];
        temp.splice(idx, 1, payload);
        return temp;
      });
    }
    if (type === "pronunce") {
      setWordPronunce((curr) => {
        const temp = [...curr];
        temp.splice(idx, 1, payload);
        return temp;
      });
    }
  };
  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const newWord = {
        id: crypto.randomUUID(),
        lessonID: table.lessonID,
        tableID: table.id,
        cases: wordCases,
        translation: wordTranslation,
        pronunce: wordPronunce,
        sortIndex: sortIndex,
        baseWord: "",
      };
      const response = await addTableWord(newWord);
      toast.success("Word Added");
    }
    // setAdd(null);
  };

  const handleReset = () => {
    setAdd(null);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Table Word</h2>
        {/* Word Cases */}
        <div>
          <div className="flex gap-3">
            <div className="field gap-3">
              <h3 className="field__label">Cases</h3>
              {table.cols.map((col, idx) => {
                return (
                  <div key={"field_" + idx}>
                    <div className="field">
                      <label htmlFor={`cases_${col}`} className="field__label">
                        {col}
                      </label>
                      <input
                        id={`cases_${col}`}
                        name={`cases_${col}`}
                        type="text"
                        title={col}
                        placeholder={col}
                        value={wordCases[idx]}
                        onChange={(e) =>
                          handleChange("cases", idx, e.target.value)
                        }
                        className="field__input"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Word Translations */}
            <div className="field gap-3">
              <h3 className="field__label">Translations</h3>
              {table.cols.map((col, idx) => {
                return (
                  <div key={"field_" + idx}>
                    <div className="field">
                      <label
                        htmlFor={`translations_${col}`}
                        className="field__label"
                      >
                        {col}
                      </label>
                      <input
                        id={`translations_${col}`}
                        name={`translations_${col}`}
                        type="text"
                        title={col}
                        placeholder={col}
                        value={wordTranslation[idx]}
                        onChange={(e) =>
                          handleChange("translation", idx, e.target.value)
                        }
                        className="field__input"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Word Pronunciation */}
            <div className="field gap-3">
              <h3 className="field__label">Pronunciation</h3>
              {table.cols.map((col, idx) => {
                return (
                  <div key={"field_" + idx}>
                    <div className="field">
                      <label
                        htmlFor={`pronunce_${col}`}
                        className="field__label"
                      >
                        {col}
                      </label>
                      <input
                        id={`pronunce_${col}`}
                        name={`pronunce_${col}`}
                        type="text"
                        title={col}
                        placeholder={col}
                        value={wordPronunce[idx]}
                        onChange={(e) =>
                          handleChange("pronunce", idx, e.target.value)
                        }
                        className="field__input"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
