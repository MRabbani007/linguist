import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentRoles } from "../auth/authSlice";
import { selectEditMode, toggleEditMode } from "../admin/adminSlice";
import { IoIosLogOut } from "react-icons/io";
import { FaUserGear } from "react-icons/fa6";

export default function UserDropDown() {
  const dispatch = useDispatch();
  const roles = useSelector(selectCurrentRoles);

  const editMode = useSelector(selectEditMode);

  const handleToggleEditMode = () => {
    if (isAdmin) {
      dispatch(toggleEditMode());
    }
  };

  const [show, setShow] = useState(false);
  const isAdmin = !!roles?.find((role) => role === 5150);

  return (
    <div
      className="relative"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        className="hidden lg:flex items-center"
        onClick={() => setShow(true)}
        title="User"
      >
        <AiOutlineUser size={30} />
      </button>
      <div
        className={
          (show ? "" : " -translate-y-[20px] invisible opacity-0") +
          " text-zinc-800 bg-zinc-100 absolute top-full right-0 flex flex-col"
        }
      >
        {isAdmin && (
          <>
            <button
              onClick={handleToggleEditMode}
              className={(editMode ? "text-green-600" : "") + " dropdown-item"}
            >
              <IoAddCircleOutline size={32} />
              <span>Toggle Edit</span>
            </button>
            <Link to="/admin" className="dropdown-item">
              <FaUserGear size={32} />
              <span>Admin Page</span>
            </Link>
          </>
        )}
        <Link to="/settings" className="flex items-center gap-2 p-2">
          <IoSettingsOutline className="icon" />
          <span>Settings</span>
        </Link>
        <Link to={"/logout"} className="dropdown-item">
          <IoIosLogOut size={32} />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
