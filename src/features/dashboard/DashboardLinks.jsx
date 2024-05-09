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
      <li className="flex-wrap">
        <span className="word-types">Words</span>
        <span className="word-types">Verbs</span>
        <span className="word-types">Nouns</span>
        <span className="word-types">Pronouns</span>
        <span className="word-types">Phrases</span>
      </li>
      <li>Common Phrases</li>
    </ul>
  );
}
