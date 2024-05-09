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
        <Link to="/definitions">Definitions</Link>
      </li>
      <li>
        <Link to="/definitions">Verbs</Link>
      </li>
      <li>
        <Link to="/definitions">Nouns</Link>
      </li>
      <li>
        <Link to="/definitions">Pronouns</Link>
      </li>
      <li>
        <Link to="/definitions">Phrases</Link>
      </li>
    </ul>
  );
}
