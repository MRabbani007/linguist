import { useEffect, useState } from "react";
import Pagination from "../../features/components/Pagination";
import { CiEdit } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { useSelector } from "react-redux";
import { selectChapters, selectLessons } from "@/features/globals/globalsSlice";
import SelectField from "@/features/ui/SelectField";
import { useLazyGetAdminSectionsQuery } from "@/features/sections/sectionSlice";

export default function AdminSections() {
  const [searchParams] = useSearchParams();
  let count = 0;

  const page = searchParams.get("page") ?? 1;

  const [getAdminSections, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAdminSectionsQuery();

  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);
  const [chapterLessons, setChapterLessons] = useState<Lesson[]>([]);

  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  useEffect(() => {
    getAdminSections({ page: +page, lessonID: selectedLesson ?? "" });
  }, [page]);

  useEffect(() => {
    if (selectedChapter) {
      setChapterLessons(
        lessons.filter((item) => item.chapterID === selectedChapter)
      );
    }
  }, [selectedChapter]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item, index) => (
      <div
        key={item.id}
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-1 border-b-[1px] border-zinc-200"
      >
        <span className="w-[5%]">
          {(+page - 1) * ITEMS_PER_PAGE + index + 1}
        </span>
        <span className="w-[20%]">{item?.title}</span>
        <span className="w-[20%]">{item?.subtitle}</span>
        <span className="flex-1">{item?.detail}</span>
        <span className="w-[5%]">
          <CiEdit size={20} />
        </span>
      </div>
    ));
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <SelectField
          label="Chapter"
          value={selectedChapter ?? ""}
          options={chapters.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          onValueChange={(val) => setSelectedChapter(val)}
        />
        <SelectField
          label="Lesson"
          options={chapterLessons.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          value={selectedLesson ?? ""}
          onValueChange={(val) => setSelectedLesson(val)}
        />
      </div>
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="w-[20%]">Title</span>
        <span className="w-[20%]">Sub-Title</span>
        <span className="flex-1">Detail</span>
        <span className="w-[5%]">Edit</span>
      </div>
      <div>{content}</div>
      <div className="flex items-center justify-between">
        <button className="btn-r btn-red">Add Section</button>
        <Pagination count={count} currentPage={+page} />
      </div>
    </>
  );
}
