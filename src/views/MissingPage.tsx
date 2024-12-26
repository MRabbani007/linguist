import { Link, useLocation } from "react-router-dom";

export default function MissingPage() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <main>
      <header className=" from-zinc-200 to-white text-zinc-600 border-2 border-zinc-400">
        <h1 className="mx-auto font-bold text-2xl">Page Not Found</h1>
      </header>
      <div>
        <Link to={from}>Go Back</Link>
        <Link to="/">Back to HomePage</Link>
      </div>
    </main>
  );
}
