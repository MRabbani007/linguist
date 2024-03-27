import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentUser } from "./authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const user = useSelector(selectCurrentUser);
  const roles = useSelector(selectCurrentRoles);

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
