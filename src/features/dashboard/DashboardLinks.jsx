import React from "react";
import { CiLink } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function DashboardLinks() {
  return (
    <ul className="dashboard-links">
      <li>
        <CiLink size={32} />
        <span>Quick Links</span>
      </li>
      <li>
        <Link to="/review/definitions">Definitions</Link>
      </li>
      <li>
        <Link to="/review/words">Words</Link>
      </li>
      <li>
        <Link to="/review/wordlists">Word Lists</Link>
      </li>
      {/* <li>
        <Link to="/review/definitions">Pronouns</Link>
      </li>
      <li>
        <Link to="/review/definitions">Phrases</Link>
      </li> */}
    </ul>
  );
}
