import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full border-t-2 border-accent bg-destructive text-destructive_foreground px-4 py-4 flex flex-col sm:flex-row sm:justify-between flex-wrap">
      <div>
        <Link to="/" title="Home" className="font-bold text-2xl text-accent">
          Lingo
        </Link>
      </div>
      <div className="flex gap-4 mt-4 sm:mt-0 text-sm md:text-base flex-1">
        <div className="flex flex-col sm:mx-auto">
          <p className="font-bold">Quick Links</p>
          <Link to="/learn">Learning</Link>
          <Link to="/exercise">Exercise</Link>
          <Link to="/review/words">Review</Link>
        </div>
        <div className="flex flex-col sm:gap-2 sm:px-8 mt-4 sm:mt-0">
          <Link to={"/about"}>About</Link>
          <Link to={"/contactUs"}>Contact Us</Link>
          <Link to={"/contactUs"}>Report a bug or a problem</Link>
        </div>
      </div>
      {/* <Link to={"/note"} className="font-bold">
        Before you start
      </Link> */}
    </div>
  );
}
