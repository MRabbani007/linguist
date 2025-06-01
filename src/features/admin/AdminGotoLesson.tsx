import { useSelector } from "react-redux";
import { selectCurrentRoles } from "../auth/authSlice";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminGotoLesson({ id }: { id: string }) {
  const roles = useSelector(selectCurrentRoles);

  const isAdmin = roles && roles.includes(2001);

  if (!isAdmin) return null;

  return (
    <Link
      to={`/admin/lessonEdit?id=${id}`}
      className="flex items-center gap-2 p-2 rounded-md bg-white ml-auto"
    >
      <CiEdit size={20} />
      <span>Edit</span>
    </Link>
  );
}
