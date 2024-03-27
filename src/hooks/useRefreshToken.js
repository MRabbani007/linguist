import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios
        .get("/user/refresh", {
          withCredentials: true,
        })
        .catch((err) => {
          console.log(err);
        });
      if (response?.data) {
        setAuth((prev) => {
          // console.log(JSON.stringify(prev));
          // console.log(response.data.accessToken);
          return {
            ...prev,
            user: response?.data?.user,
            roles: response?.data?.roles,
            accessToken: response.data.accessToken,
          };
        });
        return response.data.accessToken;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Refresh Token Error");
    }
  };
  return refresh;
};

export default useRefreshToken;
