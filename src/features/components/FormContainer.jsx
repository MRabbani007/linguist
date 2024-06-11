import React, { useEffect } from "react";

export default function FormContainer({ children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return <div className="form-container">{children}</div>;
}
