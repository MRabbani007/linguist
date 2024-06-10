import React from "react";
import Logo from "../../assets/logo-red.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full border-t-2 border-red-600 bg-zinc-100 p-4">
      <Link to="/" title="Home">
        <img
          src={Logo}
          alt="Linguist"
          width={100}
          className="shrink-0 min-w-[100px]"
        />
      </Link>
    </div>
  );
}
