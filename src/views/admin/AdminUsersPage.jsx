import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { RiAdminLine, RiUserLine } from "react-icons/ri";
import Pagination from "../../features/components/Pagination";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [add, setAdd] = useState(false);

  const getAdminUsers = async () => {
    const response = await axiosPrivate.get("/admin/users");

    if (response.status === 200 && Array.isArray(response.data)) {
      setUsers(response.data);
    }
  };

  let content = users.map((user, index) => {
    const isAdmin = user?.roles?.Admin === 5150;
    return (
      <div
        key={index}
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-2"
      >
        <span className="w-[5%]">{index + 1}</span>
        <span className="flex-1">{user?.username}</span>
        <span className="w-[20%]">{user?.email}</span>
        <span className="w-[20%] flex justify-center">
          {isAdmin ? <RiAdminLine size={26} /> : <RiUserLine size={26} />}
        </span>
        <span className="w-[20%]">{user?.createdAt}</span>
      </div>
    );
  });

  useEffect(() => {
    getAdminUsers();
  }, []);

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
        <Pagination />
      </div>
    </>
  );
}
