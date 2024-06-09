import React from "react";
import { BsThreadsFill } from "react-icons/bs";

export default function Dropdown({ items }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setShow(false)}>
      <button onMouseOver={() => setShow(true)}>
        <BsThreadsFill />
      </button>
      <ul
        className={
          (show ? "" : "invisible opacity-0 -translate-y-4") +
          "absolute top-full right-0 duration-200"
        }
      >
        {items.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
