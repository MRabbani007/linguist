import React from "react";
import Logo from "../../assets/logo-red.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full border-t-2 border-red-600 bg-zinc-100 p-4 flex flex-col sm:flex-row flex-wrap justify-evenly">
      <Link to="/" title="Home">
        <img
          src={Logo}
          alt="Linguist"
          width={100}
          className="shrink-0 min-w-[100px]"
        />
      </Link>
      <div className="flex flex-col sm:gap-2 sm:px-8">
        <Link to={"/about"}>About</Link>
        <Link to={"/about"}>Contact Us</Link>
        <Link to={"/about"}>Report a bug or a problem</Link>
      </div>
      <Link to={"/note"} className="font-bold">
        Before you start
      </Link>
      <div>
        <p className="font-bold">Quick Links</p>
        <p>Learning</p>
        <p>Exercise</p>
        <p>Review</p>
      </div>
    </div>
  );
}
