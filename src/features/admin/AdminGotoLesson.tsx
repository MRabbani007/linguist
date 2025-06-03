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
      className="flex items-center gap-2 p-1 fixed bottom-6 lg:bottom-20 right-10 md:right-20 rounded-md bg-accent text-white ml-auto z-[100] opacity-30 hover:opacity-100 duration-200"
    >
      <CiEdit size={20} className="size-6 lg:size-8" />
    </Link>
  );
}
