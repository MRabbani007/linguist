import React, { ReactNode } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function AdminLessonContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <button className="absolute top-3 right-2">
        <BsThreeDots size={20} />
      </button>
      {children}
    </div>
  );
}
