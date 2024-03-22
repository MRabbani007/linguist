import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import CardDisplayWord from "./CardDisplayWord";
import CardTableHeader from "./CardTableHeader";
import CardInputWord from "./CardInputWord";

const SectionDisplayWords = ({ block: displayBlock }) => {
  const { words } = useContext(GlobalContext);
  const [blockWords, setBlockWords] = useState([]);

  const [colSpan, setColSpan] = useState(() => {
    if (displayBlock.fourthLang !== "") {
      return 6;
    } else if (displayBlock.thirdLang !== "") {
      return 5;
    } else {
      return 4;
    }
  });

  useEffect(() => {
    let temp = words.filter((item) => item.blockID === displayBlock.id);
    setBlockWords(temp);
  }, [displayBlock, words]);

  return (
    <div className=" gap-2 border-2 p-2 w-full shrink-0 grow">
      <div className="">Introduction:</div>
      <table className="min-w-[400px] ">
        <CardTableHeader
          colSpan={colSpan}
          setColSpan={setColSpan}
          displayBlock={displayBlock}
        />
        <tbody className="">
          {Array.isArray(blockWords) &&
            blockWords.map((item, index) => {
              return (
                <CardDisplayWord
                  word={item}
                  key={index}
                  index={index}
                  colSpan={colSpan}
                  setColSpan={setColSpan}
                />
              );
            })}
        </tbody>
      </table>
      <div className=" ">Caption:</div>
      <div className=" ">Notes:</div>
      <div className=" ">Text:</div>
    </div>
  );
};

export default SectionDisplayWords;
