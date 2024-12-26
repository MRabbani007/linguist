import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  language: Language | null;
  chapters: Chapter[];
  lessons: Lesson[];
  sections: Section[];
  displayChapter: Chapter | null;
  displayLesson: Lesson | null;
  siteLanguages: Language[];
}

const initialState: InitialState = {
  siteLanguages: [],
  language: null,
  chapters: [],
  lessons: [],
  sections: [],
  displayChapter: null,
  displayLesson: null,
};

const globalsSlice = createSlice({
  name: "globals",
  initialState: initialState,
  reducers: {
    setLanguage: (state, action) => {
      return { ...state, language: action.payload };
    },
    setChapters: (state, action) => {
      return { ...state, chapters: action.payload };
    },
    setLessons: (state, action) => {
      return { ...state, lessons: action.payload };
    },
    setSections: (state, action) => {
      return { ...state, sections: action.payload };
    },
    setProgress: (state, action) => {
      return { ...state, progress: action.payload };
    },
    setSentenceSearchCount: (state, action) => {
      return { ...state, sentenceSearchCount: action.payload };
    },
    setSiteLanguages: (state, action) => {
      return { ...state, siteLanguages: action.payload };
    },
    // called to open chapter
    setDisplayChapter: (state, action) => {
      state.displayChapter = action.payload;
      // return { ...state, displayChapter: action.payload };
    },
    // called to open block
    setDisplayLesson: (state, action) => {
      state.displayLesson = action.payload;
      // return { ...state, displayBlock: action.payload };
    },
    clearState: () => {
      return initialState;
    },
  },
});

export const {
  setLanguage,
  setChapters,
  setLessons,
  setSections,
  setProgress,
  setSentenceSearchCount,
  setDisplayLesson,
  setDisplayChapter,
  setSiteLanguages,
  clearState,
} = globalsSlice.actions;

export default globalsSlice.reducer;

export const selectLanguage = (state: RootState) => state.globals.language;
export const selectChapters = (state: RootState) => state.globals.chapters;
export const selectLessons = (state: RootState) => state.globals.lessons;
export const selectSections = (state: RootState) => state.globals.sections;
export const selectDisplayChapter = (state: RootState) =>
  state.globals.displayChapter;
export const selectDisplayLesson = (state: RootState) =>
  state.globals.displayLesson;
export const selectSiteLanguages = (state: RootState) =>
  state.globals.siteLanguages;
