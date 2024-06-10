import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: {},
  progress: [],
  chapters: [],
  lessons: [],
  sentenceSearchCount: 0,
  displayChapter: null,
  displayBlock: null,
  editMode: false,
  siteLanguages: [],
};

const globalsSlice = createSlice({
  name: "globals",
  initialState: initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      return state;
    },
    setChapters: (state, action) => {
      state.chapters = action.payload;
      return state;
    },
    setLessons: (state, action) => {
      state.lessons = action.payload;
      return state;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
      return state;
    },
    setSentenceSearchCount: (state, action) => {
      state.sentenceSearchCount = action.payload;
      return state;
    },
    setSiteLanguages: (state, action) => {
      state.siteLanguages = action.payload;
      return state;
    },
    // called to open chapter
    setDisplayChapter: (state, action) => {
      state.displayChapter = action.payload;
      return state;
    },
    // called to open block
    setDisplayBlock: (state, action) => {
      const displayBlock = action.payload;
      state.displayBlock = displayBlock;
      return state;
    },
    clearState: (state, action) => {
      return initialState;
    },
    toggleEditMode: (state, action) => {
      state.editMode = !state.editMode;
    },
  },
});

export const {
  setLanguage,
  setChapters,
  setLessons,
  setProgress,
  setSentenceSearchCount,
  setDisplayBlock,
  setDisplayChapter,
  setSiteLanguages,
  toggleEditMode,
  clearState,
} = globalsSlice.actions;

export default globalsSlice.reducer;

export const selectSentenceCount = (state) => state.globals.sentenceSearchCount;
export const selectLanguage = (state) => state.globals.language;
export const selectChapters = (state) => state.globals.chapters;
export const selectLessons = (state) => state.globals.lessons;
export const selectProgress = (state) => state.globals.progress;
export const selectDisplayChapter = (state) => state.globals.displayChapter;
export const selectDisplayBlock = (state) => state.globals.displayBlock;
export const selectEditMode = (state) => state.globals.editMode;
export const selectSiteLanguages = (state) => state.globals.siteLanguages;
