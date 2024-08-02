import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full border-t-2 border-accent bg-destructive text-destructive_foreground px-4 py-4 sm:px-10 sm:py-10 flex flex-col sm:flex-row sm:justify-between flex-wrap">
      <Link to="/" title="Home" className="font-bold text-2xl text-accent">
        Lingo
      </Link>
      <div>
        <p className="font-bold">Quick Links</p>
        <p>Learning</p>
        <p>Exercise</p>
        <p>Review</p>
      </div>
      <div className="flex flex-col sm:gap-2 sm:px-8">
        <Link to={"/about"}>About</Link>
        <Link to={"/about"}>Contact Us</Link>
        <Link to={"/about"}>Report a bug or a problem</Link>
      </div>
      {/* <Link to={"/note"} className="font-bold">
        Before you start
      </Link> */}
    </div>
  );
}
