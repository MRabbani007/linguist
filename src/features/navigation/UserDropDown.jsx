import React, { forwardRef } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const UserDropDown = forwardRef(({}, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-0 right-0 w-fit p-2 flex flex-col gap-2"
    >
      <Link to="/settings">
        <IoSettingsOutline className="icon" />
        <span>Settings</span>
      </Link>
    </div>
  );
});

export default UserDropDown;
