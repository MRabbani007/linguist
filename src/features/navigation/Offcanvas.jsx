import { forwardRef } from "react";
// Imported Media

const Offcanvas = forwardRef(({ viewSideBar }, ref) => {
  return (
    <nav
      ref={ref}
      className={
        (viewSideBar ? "left-3 visible" : "left-[-2000px] invisible") +
        " fixed top-[60px] sm:w-[300px] w-full min-h-screen p-2 rounded-lg duration-300 bg-neutral-50"
      }
    ></nav>
  );
});

export default Offcanvas;
