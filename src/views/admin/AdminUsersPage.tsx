import { useEffect, useState } from "react";
import { RiAdminLine, RiUserLine } from "react-icons/ri";
import Pagination from "../../features/components/Pagination";
import { useLazyGetAdminUsersQuery } from "@/features/admin/adminApiSlice";
import { useSearchParams } from "react-router-dom";
import FormEditUser from "@/features/admin/FormEditUser";
import { ROLES_LIST } from "@/lib/constants";

export default function AdminUsersPage() {
  const [getAdminUsers, { data }] = useLazyGetAdminUsersQuery();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  let count = 0;

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<AdminUser | null>(null);

  let content = data?.data?.map((user, index) => {
    const isAdmin = user?.rolesAdmin === ROLES_LIST.Admin;
    const isEdittor = user?.rolesEditor === ROLES_LIST.Editor;
    const isUser = user?.rolesUser === ROLES_LIST.User;

    return (
      <div
        key={index}
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-2 border-b-[1px] border-zinc-400"
      >
        <span className="w-[5%]">{index + 1}</span>
        <span
          className="flex-1"
          onClick={() => {
            setEdit(true);
            setEditItem(user);
          }}
        >
          {user?.username}
        </span>
        <span className="w-[20%]">{user?.email}</span>
        <span className="w-[20%] flex justify-center">
          {isUser && <RiUserLine size={26} className="text-green-600" />}
          {isEdittor && <RiUserLine size={26} className="text-sky-600" />}
          {isAdmin && <RiAdminLine size={26} className="text-red-600" />}
        </span>
        <span className="w-[20%]">
          {user?.createDate?.toString().substr(0, 10)}
        </span>
      </div>
    );
  });

  useEffect(() => {
    getAdminUsers(+page);
  }, [page]);

  return (
    <>
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="flex-1">Username</span>
        <span className="w-[20%]">Email</span>
        <span className="w-[20%]">Roles</span>
        <span className="w-[20%]">Create Date</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <span></span>
        <Pagination count={count} currentPage={+page} />
      </div>
      {edit && editItem && <FormEditUser user={editItem} setEdit={setEdit} />}
    </>
  );
}
