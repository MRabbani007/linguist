import {
  useGetWordListbyIDQuery,
  useGetWordListsQuery,
} from "@/features/profile/profileSlice";
import CardWord from "@/features/words/CardWord";
import WordContainer from "@/features/words/WordContainer";
import { useSearchParams } from "react-router-dom";

export default function WordListsPage() {
  const [searchParams] = useSearchParams();
  const listID = searchParams.get("listID") ?? "";

  const { data: wordLists } = useGetWordListsQuery(null);

  const { data, isSuccess } = useGetWordListbyIDQuery(listID);

  let content;

  if (isSuccess) {
    const { words, wordsData } = data;
    if (words.length === 0) {
      content = <p>This list is empty</p>;
    } else {
      content = words.map((word) => {
        const wordData =
          wordsData.find((item) => item.wordID === word.id) ?? null;
        return (
          <WordContainer
            key={word.id}
            word={word}
            listID={listID}
            wordData={wordData}
          >
            <CardWord word={word} />
          </WordContainer>
        );
      });
    }
  }

  const wordList = Array.isArray(wordLists)
    ? wordLists.find((item) => item.id === listID)
    : null;

  return (
    <main>
      <header className="bg-gradient-to-r p-4 from-zinc-200 to-white text-zinc-600">
        <h1 className="mx-auto font-bold text-2xl">Word Lists</h1>
      </header>
      <div className="font-medium text-2xl">{wordList && wordList?.name}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content}
      </div>
    </main>
  );
}
