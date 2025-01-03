import { useState, useEffect } from "react";

const getLocalValue = (key: string, initValue: any) => {
  //SSR Next.js
  if (typeof window === "undefined") return initValue;

  const localItem = localStorage?.getItem(key);
  if (!!localItem) return JSON.parse(localItem);

  // return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

export default function useLocalStorage(key: string, initValue: any) {
  const [value, setValue] = useState<any>(() => {
    return getLocalValue(key, initValue);
  });

  const handleValue = (value: any) => {
    setValue(value);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, handleValue];
}
