import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { RiAdminLine, RiUserLine } from "react-icons/ri";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const [add, setAdd] = useState(false);

  const getAdminUsers = async () => {
    const response = await axiosPrivate.get("/admin/users");

    if (response.status === 200 && Array.isArray(response.data)) {
      setUsers(response.data);
    }
  };

  useEffect(() => {
    getAdminUsers();
  }, []);

  console.log(users);

  return (
    <main>
      <div className="grid grid-cols-5 items-center gap-2 bg-zinc-200 py-2 px-4">
        <span>SN</span>
        <span>Username</span>
        <span>Email</span>
        <span>Roles</span>
        <span>Create Date</span>
      </div>
      <div className="flex flex-col gap-2">
        {Array.isArray(users) &&
          users.map((user, index) => {
            const isAdmin = user?.roles?.Admin === 5150;
            return (
              <div
                key={index}
                className="grid grid-cols-5 items-start gap-2 bg-zinc-100 py-2 px-4"
              >
                <span>{index + 1}</span>
                <span>{user?.username}</span>
                <span>{user?.email}</span>
                <span>
                  {isAdmin ? (
                    <RiAdminLine size={26} />
                  ) : (
                    <RiUserLine size={26} />
                  )}
                </span>
                <span>{user?.createdAt}</span>
              </div>
            );
          })}
      </div>
    </main>
  );
}
