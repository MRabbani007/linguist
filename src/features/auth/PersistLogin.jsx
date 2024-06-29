import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";
import ReactLoading from "react-loading";

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
          dispatch(
            setCredentials({
              ...userData.data,
              token: userData.data.accessToken,
            })
          );
        }
      } catch (err) {
        // console.error(err);
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
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <main>
          <header className=" text-zinc-800 font-medium">
            <h1>
              Welcome to <span className="text-red-700 font-bold">Lingo</span>!
            </h1>
          </header>
          <div>
            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p>Connecting to server</p>
              <ReactLoading
                type={"spin"}
                color={"#000"}
                height={"50px"}
                width={"50px"}
                className="mx-auto"
              />
            </div>
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
