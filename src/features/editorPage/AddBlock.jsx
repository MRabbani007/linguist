import { useState } from "react";

const AddBlock = () => {
  const [addBlock, setAddBlock] = useState(false);

  return (
    <div className="flex flex-row items-center justify-start">
      {addBlock ? (
        <FaCircleMinus
          className="icon m-1"
          onClick={() => {
            setAddBlock(!addBlock);
          }}
        />
      ) : (
        <FaCirclePlus
          className="icon m-1"
          onClick={() => {
            setAddBlock(!addBlock);
          }}
        />
      )}
      {addBlock && <CardBlockAdd setAddBlock={setAddBlock} />}
    </div>
  );
};

export default AddBlock;
