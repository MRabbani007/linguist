import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import FormLessonEdit from "../../features/lessons/FormLessonEdit";
import FormLessonAdd from "../../features/lessons/FormLessonAdd";
import { selectChapters } from "../../features/globals/globalsSlice";
import { useSearchParams } from "react-router-dom";
import { useLazyGetAdminLessonsQuery } from "@/features/lessons/lessonSlice";
import CardAdminLesson from "@/features/admin/CardAdminLesson";
import SelectField from "@/features/ui/SelectField";
import { BiX } from "react-icons/bi";

export default function AdminLessons() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  let count = 0;

  const chapters = useSelector(selectChapters);

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const [editItem, setEditItem] = useState<Lesson | null>(null);
  const [chapter, setChapter] = useState("");

  const [getAllLessons, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetAdminLessonsQuery();

  useEffect(() => {
    getAllLessons({ page, chapter });
  }, [page]);

  useEffect(() => {
    getAllLessons({ page, chapter });
  }, [chapter]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item) => (
      <CardAdminLesson
        lesson={item}
        key={item.id}
        setEdit={setEdit}
        setEditItem={setEditItem}
        page={page}
      />
    ));
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <SelectField
          label="Chapter"
          onValueChange={(val) => setChapter(val)}
          options={chapters.map((item) => ({
            value: item.id,
            label: item.title,
          }))}
        />
        <button
          onClick={() => setChapter("")}
          className="py-2 px-4 rounded-md bg-red-600 hover:bg-red-500 text-white duration-200 flex items-center gap-2 group"
        >
          <BiX size={20} />
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-4">{content}</div>
      {/* Page Footer */}
      <div className="flex items-center justify-between">
        <button
          className="py-2 px-4 rounded-md bg-red-600 hover:bg-red-500 text-white duration-200 flex items-center gap-2 group"
          title="Add Lesson"
          onClick={() => setAdd(true)}
        >
          Add Lesson
        </button>
        <Pagination count={count} currentPage={+page} />
      </div>
      {edit === true && editItem && (
        <FormLessonEdit lesson={editItem} setEdit={setEdit} />
      )}
      {add && <FormLessonAdd setAdd={setAdd} />}
    </>
  );
}
