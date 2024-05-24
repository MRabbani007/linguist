import React, { forwardRef } from "react";
import { selectEditMode, toggleEditMode } from "../globals/globalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const AdminDropDown = forwardRef(({ viewUserDropDown }, ref) => {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  return (
    <div
      ref={ref}
      className={
        (viewUserDropDown ? " " : " -translate-y-[20px] invisible opacity-0") +
        " absolute top-10 right-0 w-fit whitespace-nowrap text-zinc-800 bg-slate-200 p-2 flex flex-col gap-2 z-10 rounded-lg duration-200"
      }
    >
      <Link to={"/login"} className="flex items-center gap-2">
        <IoIosLogOut size={32} />
        <span>Sign Out</span>
      </Link>
      <button
        onClick={handleToggleEditMode}
        className={
          (editMode ? "text-green-600" : "") + " flex items-center gap-2"
        }
      >
        <IoAddCircleOutline size={32} />
        <span>Toggle Edit</span>
      </button>
      <Link to="/settings" className="flex items-center gap-2">
        <IoSettingsOutline size={32} />
        <span>Settings</span>
      </Link>
      <Link to="/admin" className="flex items-center gap-2">
        <FaUserGear size={32} />
        <span>Admin Page</span>
      </Link>
    </div>
  );
});

export default AdminDropDown;
