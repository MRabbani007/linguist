import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardBlockTitle from "./CardBlockTitle";
import CardBlockAdd from "./CardBlockAdd";

const BlockList = () => {
  const { displayChapter, displayBlock, blocks } = useContext(GlobalContext);

  return (
    <div className="flex flex-col w-full max-w-[1000px]">
      <h2 className="font-bold text-xl text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400">
        {displayChapter.title +
          (!!displayChapter.subtitle ? ", " + displayChapter?.subtitle : "") +
          (!!displayChapter.detail ? ", " + displayChapter?.detail : "")}
      </h2>
      <div className="flex flex-wrap justify-center gap-3 py-2 px-4">
        {!!blocks &&
          blocks.map((item, index) => {
            return <CardBlockTitle block={item} key={index} />;
          })}
      </div>
      <div>
        <CardBlockAdd />
      </div>
    </div>
  );
};

export default BlockList;
