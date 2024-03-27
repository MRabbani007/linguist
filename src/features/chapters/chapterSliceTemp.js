import { sub } from "date-fns";
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  chapters: [
    { id: "1", title: "First Chapter", subtitle: "the first one", detail: "" },
    {
      id: "2",
      title: "Second Chapter",
      subtitle: "the second one",
      detail: "",
    },
  ],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

export const chapterSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    handleLoadChapter: (state, action) => {
      return action.payload;
    },
    handleAddChapter: {
      reducer(state, action) {
        state.push(action.payload);
        return state;
      },
      prepare(title, subTitle, detail) {
        return {
          payload: {
            id: nanoid(),
            title,
            subTitle,
            detail,
            date: sub(new Date(), { minutes: 10 }).toISOString(),
          },
        };
      },
    },
    handleEditChapter(state, action) {
      let { id, title, subtitle, detail } = action?.payload;
      let oldChapterIndex = state.findIndex((item) => item.id === id);
      let newChapter = {
        ...state[oldChapterIndex],
        title,
        subtitle,
        detail,
      };
      state.splice(oldChapterIndex, 1, newChapter);
      return state;
    },
    handleDeleteChapter: (state, action) => {
      let { id } = action.payload;
      return state.filter((chapter) => chapter.id !== id);
    },
  },
});

export const getChapters = (state) => {
  return state?.chapter;
};

export const {
  handleLoadChapter,
  handleAddChapter,
  handleEditChapter,
  handleDeleteChapter,
} = chapterSlice.actions;

export default chapterSlice.reducer;
