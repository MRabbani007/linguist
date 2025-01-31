import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

const initialValue: { page: string } = { page: "" };

export const TabsContext = createContext(initialValue);
export const TabsProvider = ({ children }: { children?: ReactNode }) => {
  const [page, setPage] = useState("content");

  return (
    <TabsContext.Provider value={{ page }}>{children}</TabsContext.Provider>
  );
};

export default function MultiTabs({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const [id, setId] = useState(crypto.randomUUID());
  const [page, setPage] = useState("content");

  return <div className={className}>{children}</div>;
}

export function TabNavigator({
  pages,
  page,
  setPage,
  className,
}: {
  pages: string[];
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 p-1 rounded-md bg-zinc-200 w-fit mx-auto text-sm font-medium">
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setPage(item)}
          className={
            (page === item ? "bg-white" : "bg-zinc-300") +
            " py-2 px-4 rounded-md duration-200"
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function TabContent({
  currentPage,
  pageName,
  children,
  className,
}: {
  currentPage: string;
  pageName: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        (pageName === currentPage ? "" : "hidden") +
        " flex flex-col gap-4 self-stretch items-stretch " +
        className
      }
    >
      {children}
    </div>
  );
}
