import { useState } from "react";
import { axiosPrivate } from "../api/axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const initialStatus = {
  isLoading: true,
  isSuccess: false,
  isError: false,
};

export default function useGetExerciseLessons() {
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState("");

  const [data, setData] = useState([]);

  const token = useSelector(selectCurrentToken);

  const fetchLessons = async () => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      const response = await axiosPrivate("/exercises", {
        method: "GET",
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
        isSuccess: false,
        isError: true,
      });
    }
  };

  return { fetchLessons, data, ...status, error };
}
