import { Link } from "react-router-dom";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditMode } from "../globals/globalsSlice";
import { selectCurrentRoles, selectCurrentUser } from "../auth/authSlice";
import { FaUserGear } from "react-icons/fa6";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const roles = useSelector(selectCurrentRoles);

  const dispatch = useDispatch();

  const isAdmin = !!roles?.find((role) => role === 5150);

  const handleToggleEditMode = () => {
    if (isAdmin) {
      dispatch(toggleEditMode());
    }
  };
  // const sideBarRef = useRef();
  // const sideBarButtonRef = useRef();

  // const closeSideBar = (e) => {
  //   if (!sideBarRef.current.contains(e.target)) {
  //     if (sideBarButtonRef.current.contains(e.target)) {
  //     } else {
  //       // handleSideBar(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", closeSideBar);
  //   return () => {
  //     document.removeEventListener("mousedown", closeSideBar);
  //   };
  // }, []);

  return (
    <menu className="navbar-red">
      <span className="flex items-center justify-between gap-3">
        <Link to="/">
          <IoHomeOutline className="icon" />
        </Link>
        <Link to="/chapters">
          <TbReportAnalytics className="icon" />
        </Link>
        {isAdmin && (
          <button onClick={handleToggleEditMode}>
            <IoAddCircleOutline className="icon" />
          </button>
        )}
        <Link to="/settings">
          <IoSettingsOutline className="icon" />
        </Link>
        <Link to="/admin">
          <FaUserGear className="icon" />
        </Link>
      </span>
      <span>
        {!user ? (
          <Link to="/login">
            <FiUser className="icon" />
          </Link>
        ) : (
          <Link to="/login">
            {user}
            <FiUser className="icon" />
          </Link>
        )}
      </span>
      {/* <Offcanvas
        viewSideBar={viewSideBar}
        handleSideBar={handleSideBar}
        ref={sideBarRef}
      /> */}
    </menu>
  );
};

export default Navbar;
