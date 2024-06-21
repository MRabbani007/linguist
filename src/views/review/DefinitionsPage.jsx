import React from "react";
import { useGetAllDefinitionsQuery } from "../../features/definitions/definitionsSlice";
import Definition from "../../features/definitions/Definition";

export default function DefinitionsPage() {
  const { data, isLoading, isSuccess } = useGetAllDefinitionsQuery();

  let content = null;
  if (isSuccess) {
    const { ids, entities } = data;
    content = ids.map((id) => {
      return <Definition definition={entities[id]} key={id} />;
    });
  }
  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Definitions</h1>
      </header>
      <div className="flex flex-col gap-3">{content}</div>
    </main>
  );
}
