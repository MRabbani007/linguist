import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";

const PersistLogin = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const refresh = useRefreshToken();
  const accessToken = useSelector(selectCurrentToken);
  const [persist] = useLocalStorage("persist", false);

  const [refresh, { isLoading }] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const userData = await refresh();

        if (userData) {
          dispatch(setCredentials({ ...userData.data }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        isMounted; //&& setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !accessToken && persist ? verifyRefreshToken() : null; // setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // useEffect(() => {
  // console.log(`isLoading: ${isLoading}`);
  // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
