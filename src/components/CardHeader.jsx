import React from "react";
import useAuth from "../hooks/useAuth";
import { genDate } from "../data/utils";

const CardHeader = () => {
  const { auth } = useAuth();

  const today = genDate();

  return (
    <div className="w-fit">
      <h2 className="bg-red-600 text-red-50 rounded-t-lg py-2 px-4">
        {auth.user}
      </h2>
      <p className="py-2 px-4 border-2 border-red-600">
        Roles: {JSON.stringify(auth.roles)}
      </p>
      <p className="bg-red-600 text-red-50 rounded-b-lg py-2 px-4 text-end">
        {today.day + ", " + today.date + " " + today.month}
      </p>
    </div>
  );
};

export default CardHeader;
