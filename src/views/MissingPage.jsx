import React from "react";
import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <main>
      <h2>Page Not Found</h2>
      <p>
        <Link to="/">Back to HomePage</Link>
      </p>
    </main>
  );
};

export default MissingPage;
