import { useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { ACTIONS, SERVER } from "../data/actions";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useState } from "react";

export default function useGetExerciseWords() {
  const [status, setStatus] = useState({
    isLoading: true,
    isError: false,
    isSuccess: false,
  });

  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const token = useSelector(selectCurrentToken);

  const handleFetch = async (selectedLessons = []) => {
    setStatus({
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    try {
      const response = await axiosPrivate(SERVER.GET_WORD_RANDOM, {
        method: "POST",
        data: {
          action: {
            type: ACTIONS.GET_WORD_RANDOM,
            payload: {
              selectedLessons,
            },
          },
        },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response?.status === 200 && Array.isArray(response?.data)) {
        setData(response?.data);
        setStatus({
          isLoading: false,
          isError: false,
          isSuccess: true,
        });
      }
    } catch (error) {
      setError(error?.message);
      setStatus({
        isLoading: false,
        isError: true,
        isSuccess: false,
      });
    } finally {
      setStatus((curr) => {
        return { ...curr, isLoading: false };
      });
    }
  };

  return { handleFetch, ...status, error, data };
}
