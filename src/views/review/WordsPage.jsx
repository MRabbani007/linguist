import React from "react";

const levels = [
  "Beginner - A1",
  "Beginner - A2",
  "Intermediate - B1",
  "Intermediate - B2",
  "Advanced - C1",
  "Advanced - C2",
];

const subjects = [
  "Food",
  "Health",
  "House & Apartment",
  "Hobbies & Activities",
  "Holidays & Celebrations",
  "Nature",
  "Common Words",
];

const types = ["Nouns", "Verbs", "Adjectives", "Adverbs"];

const wordLists = ["Basic Words", "Most Common", "Emergency Russian"];

const items = [
  { title: "Words by Subject", url: "", children: subjects },
  { title: "Words by Level", url: "", children: levels },
  { title: "Words by Type", url: "", children: types },
];

export default function WordsPage() {
  return (
    <main className="">
      {/* <header className="">
        <h1 className="mx-auto font-bold text-2xl">Words</h1>
      </header> */}
      <form className="flex flex-col items-center justify-center gap-2">
        <p className="mx-auto font-bold text-2xl">Search</p>
        <input type="text" className="bg-zinc-400/10 w-full py-2 px-4" />
      </form>
      <div className="flex items-stretch gap-8 w-full">
        {items.map((item, index) => (
          <div key={index} className="flex-1">
            <p className="font-bold text-3xl py-6 px-8 bg-zinc-200 text-center">
              {item.title}
            </p>
            <div className="flex-1">
              {item?.children.map((i, idx) => (
                <div
                  key={idx}
                  className="py-2 px-4 bg-zinc-100 hover:bg-zinc-200 duration-200"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
