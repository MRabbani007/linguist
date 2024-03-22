export const LOCAL_USER = "linguistUser";

export const parseDate = (date) => {
  return date.substr(0, 10);
};

export const getDate = (offset = 0, baseDate) => {
  if (baseDate === undefined || baseDate === null) {
    baseDate = new Date();
  }
  const today = new Date(
    new Date(baseDate).getTime() + offset * 24 * 60 * 60 * 1000
  );
  // Format <"YYYY-MM-DD"> for mongoDb
  const result =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    today.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  return result;
};

export const getMonth = (offset = 0) => {
  // const today = new Date(new Date().getTime() + offset * 24 * 60 * 60 * 1000);
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // Format <"YYYY-MM-DD"> for mongoDb
  return {
    firstDay: formatDate(firstDay),
    lastDay: formatDate(lastDay),
  };
};

export const currencyExchange = (amount, baseCurrency, OutputCurrency) => {
  switch (baseCurrency + OutputCurrency) {
    case "USDKZT": {
      return amount * 456;
    }
    case "KZTUSD": {
      return amount * 0.00219;
    }
  }
};

const formatDate = (date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  );
};

export const genDate = (offset = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    day: weekdayShort[date.getDay()],
    date: date.getDate(),
    month: monthShort[date.getMonth()],
  };
};

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const saveLocal = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
  return true;
};

export const loadLocal = (name) => {
  let data = localStorage.getItem(name);
  if (!!data) {
    return JSON.parse(data);
  } else return null;
};

export const removeLocal = (name) => {
  localStorage.removeItem(name);
  return true;
};
