import React, { useState } from "react";
import {
  useEditTableWordMutation,
  useRemoveTableWordMutation,
} from "../tableWords/tableWordsSlice";
import { toast } from "react-toastify";

const getWordArray = (arr, colsLen) => {
  if (!Array.isArray(arr)) {
    return new Array(colsLen).fill("");
  }
  if (arr.length < colsLen) {
    const temp = new Array(colsLen - arr.length).fill("");
    return [...arr, ...temp];
  }
  if (arr.length > colsLen) {
    const temp = [...arr];
    temp.splice(colsLen);
    return temp;
  }
  return arr;
};

export default function FormTableWordEdit({ word, table, setEdit }) {
  const [editTableWord, { isLoading }] = useEditTableWordMutation();
  const [deleteTableWord] = useRemoveTableWordMutation();

  const [sortIndex, setSortIndex] = useState(word.sortIndex);
  const [wordCases, setWordCases] = useState(
    getWordArray(word?.cases, table.cols.length)
  );
  const [wordTranslation, setWordTranslation] = useState(
    getWordArray(word?.translation, table.cols.length)
  );
  const [wordPronunce, setWordPronunce] = useState(
    getWordArray(word?.pronunce, table.cols.length)
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
        ...word,
        cases: wordCases,
        translation: wordTranslation,
        pronunce: wordPronunce,
        sortIndex: sortIndex,
      };
      const response = await editTableWord(newWord);
      toast.success("Word Saved");
      setEdit(null);
    }
  };

  const handleReset = () => {
    setEdit(null);
  };

  const handleDelete = async () => {
    if (confirm("Delete this word?")) {
      await deleteTableWord(word.id);
      toast.success("Word Deleted");
      setEdit(null);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit Table Word</h2>
        {/* Word Cases */}
        <div>
          <div className="flex gap-3">
            <div className="field gap-3">
              <h3 className="field__label">Cases</h3>
              {!!wordCases &&
                table.cols.map((col, idx) => {
                  return (
                    <div>
                      <div className="field">
                        <label
                          htmlFor={`cases_${col}`}
                          className="field__label"
                        >
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
              {wordTranslation.length !== 0 &&
                table.cols.map((col, idx) => {
                  return (
                    <div>
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
              {wordPronunce.length !== 0 &&
                table.cols.map((col, idx) => {
                  return (
                    <div>
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
            <button type="submit" title="Save" className="save">
              Save
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
            <button
              type="button"
              title="Delete"
              className="delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
