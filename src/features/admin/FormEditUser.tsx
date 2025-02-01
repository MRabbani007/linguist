import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import FormContainer from "../components/FormContainer";
import InputField from "../ui/InputField";
import { useUpdateAdminUserMutation } from "./adminApiSlice";
import CheckboxField from "../ui/CheckboxField";
import { T_ADMINUSER } from "@/data/templates";
import { toast } from "react-toastify";
import { ROLES_LIST } from "@/lib/constants";

export default function FormEditUser({
  user,
  setEdit,
}: {
  user: AdminUser;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [updateUser] = useUpdateAdminUserMutation();
  const [state, setState] = useState({ ...T_ADMINUSER, ...user });

  //   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     setState((prevProps) => ({
  //       ...prevProps,
  //       [name]: value,
  //     }));
  //   };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await updateUser(state).unwrap();

      console.log(response);
      if (response) {
        toast.success("User updated");
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  }

  return (
    <FormContainer
      title="Edit User Settings"
      type="edit"
      submitButton="Update"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <p>{user?.username}</p>
      <p>Roles</p>
      <CheckboxField
        label="User"
        name="rolesUser"
        value={state?.rolesUser === ROLES_LIST.User}
        onChange={(val: boolean) =>
          setState((curr) => ({
            ...curr,
            rolesUser: val === true ? ROLES_LIST?.User : 0,
          }))
        }
      />
      <CheckboxField
        label="Editor"
        name="rolesEditor"
        value={state?.rolesEditor === ROLES_LIST.Editor}
        onChange={(val: boolean) =>
          setState((curr) => ({
            ...curr,
            rolesEditor: val === true ? ROLES_LIST.Editor : 0,
          }))
        }
      />
      <CheckboxField
        label="Admin"
        name="rolesAdmin"
        value={state?.rolesAdmin === ROLES_LIST.Admin}
        onChange={(val: boolean) =>
          setState((curr) => ({
            ...curr,
            rolesAdmin: val === true ? ROLES_LIST.Admin : 0,
          }))
        }
      />
    </FormContainer>
  );
}
