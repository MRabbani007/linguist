import { ReactNode } from "react";

export default function ToolTip({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="w-fit relative group">
      {children}
      {text?.trim() && (
        <span className="opacity-0 group-hover:opacity-100 duration-200 -translate-x-4 group-hover:translate-x-0 absolute left-full top-1/2 -translate-y-1/2 z-[100] bg-red-100 rounded-md py-1 px-3 text-sm font-normal">
          {text}
        </span>
      )}
    </div>
  );
}
