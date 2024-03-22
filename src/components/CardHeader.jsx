import React from "react";
import useAuth from "../hooks/useAuth";

const CardHeader = () => {
  const { auth } = useAuth();

  return (
    <div className="border-1p border-red-600">
      <h2>{auth.user}</h2>
      <p>Roles: {JSON.stringify(auth.roles)}</p>
    </div>
  );
};

export default CardHeader;
