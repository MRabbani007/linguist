import Skeleton from "./Skeleton";

export default function SkeletonContentPage() {
  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Loading...</h1>
      </header>
      <div>
        <Skeleton classes="title width-50" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="title width-50" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
      </div>
    </main>
  );
}
