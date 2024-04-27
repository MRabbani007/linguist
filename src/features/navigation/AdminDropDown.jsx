import React, { forwardRef } from "react";
import { toggleEditMode } from "../globals/globalsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const AdminDropDown = forwardRef(({}, ref) => {
  const dispatch = useDispatch();

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  return (
    <div
      ref={ref}
      className="absolute top-10 right-0 w-fit whitespace-nowrap bg-slate-200 text-red-500 p-2 flex flex-col gap-2"
    >
      <Link to={"/login"} className="flex items-center gap-2">
        <IoIosLogOut size={34} />
        <span>Sign Out</span>
      </Link>
      <button
        onClick={handleToggleEditMode}
        className="flex items-center gap-2"
      >
        <IoAddCircleOutline className="icon" />
        <span>Toggle Edit</span>
      </button>
      <Link to="/settings" className="flex items-center gap-2">
        <IoSettingsOutline className="icon" />
        <span>Settings</span>
      </Link>
      <Link to="/admin" className="flex items-center gap-2">
        <FaUserGear className="icon" />
        <span>Admin Page</span>
      </Link>
    </div>
  );
});

export default AdminDropDown;
