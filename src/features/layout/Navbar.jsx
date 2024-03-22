import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Imported Context
import AuthContext from "../../context/AuthProvider";
import { GlobalContext } from "../../context/GlobalState";
// Imported Components
import CardThemes from "../../components/CardThemes";
import Offcanvas from "../navigation/Offcanvas";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoSettingsOutline,
  IoMenuSharp,
} from "react-icons/io5";

const Navbar = () => {
  const { auth } = useContext(AuthContext);
  const { viewSideBar, handleSideBar } = useContext(GlobalContext);
  const sideBarRef = useRef();
  const sideBarButtonRef = useRef();

  const closeSideBar = (e) => {
    if (!sideBarRef.current.contains(e.target)) {
      if (sideBarButtonRef.current.contains(e.target)) {
      } else {
        handleSideBar(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  return (
    <nav className="navbar flex items-center justify-between px-5 duration-500 bg-red-600 text-white">
      <span>
        <span
          ref={sideBarButtonRef}
          onClick={() => handleSideBar()}
          className="hidden"
        >
          <IoMenuSharp className="icon" />
        </span>
        <Link to="/">
          <IoHomeOutline className="icon mx-3" />
        </Link>
        <Link to="/chapters">
          <TbReportAnalytics className="icon" />
        </Link>
        <Link to="/addContent">
          <IoAddCircleOutline className="icon mx-3" />
        </Link>
        <Link to="/settings">
          <IoSettingsOutline className="icon" />
        </Link>
      </span>
      <span>
        {/* <MdOutlineDarkMode className="icon mx-3" /> */}
        <CardThemes />
        {auth?.user === "" ? (
          <Link to="/login">
            <FiUser className="icon" />
          </Link>
        ) : (
          <Link to="/login">
            {auth?.user === "" ? "" : auth?.user}
            <FiUser className="icon" />
          </Link>
        )}
      </span>
      <Offcanvas
        viewSideBar={viewSideBar}
        handleSideBar={handleSideBar}
        ref={sideBarRef}
      />
    </nav>
  );
};

export default Navbar;
