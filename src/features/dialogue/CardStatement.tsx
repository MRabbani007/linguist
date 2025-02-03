import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../admin/adminSlice";

export default function CardStatement({
  statement,
}: {
  statement: DialogueStatement;
}) {
  const editMode = useSelector(selectEditMode);
  const [showTr, setShowTr] = useState(false);

  useEffect(() => {
    if (editMode) {
      setShowTr(true);
    }
  }, [editMode]);

  return (
    <div
      className={
        "flex items-stretch justify-start gap-4 bg-zinc-50 rounded-md overflow-clip"
      }
    >
      <p
        className={
          "w-2 flex items-center justify-center " +
          (statement?.person === "1"
            ? "bg-orange-600/70"
            : statement?.person === "2"
            ? "bg-sky-500/70"
            : "")
        }
      ></p>
      <div className={"flex flex-col gap-0 flex-1 py-2"}>
        <p
          className="cursor-pointer font-medium tracking-wider"
          onClick={() => setShowTr((curr) => !curr)}
        >
          {statement?.text}
        </p>
        <p
          className={
            (showTr ? "" : "invisible opacity-0 h-0 pointer-events-none") +
            "  text-sm duration-200"
          }
        >
          {statement?.translation}
        </p>
      </div>
    </div>
  );
}
