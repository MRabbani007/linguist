import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentUser } from "./authSlice";

export default function RequireAuth({
  allowedRoles,
}: {
  allowedRoles: number[];
}) {
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
}
