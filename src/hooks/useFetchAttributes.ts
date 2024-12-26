import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

export function useFetchAttributes() {
  const [data, setData] = useState<WordAttribute[]>([]);
  const [count, setCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleFetch() {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);

      const response = await axiosPrivate.get("/review/words/attributes");

      if (response.status === 200 && Array.isArray(response.data.data)) {
        setData(response.data?.data as WordAttribute[]);
        setCount(response.data?.count as number);

        setIsSuccess(true);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }

  useEffect(() => {
    handleFetch();
  }, []);

  const state: { isLoading: boolean; isSuccess: boolean; isError: boolean } = {
    isLoading,
    isSuccess,
    isError,
  };

  return [data, state];
}
