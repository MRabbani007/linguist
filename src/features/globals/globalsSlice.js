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
    setLanguage: (state = initialState, action) => {
      return { ...state, language: action.payload };
    },
    setChapters: (state, action) => {
      return { ...state, chapters: action.payload };
    },
    setLessons: (state, action) => {
      return { ...state, lessons: action.payload };
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
      return { ...state, displayChapter: action.payload };
    },
    // called to open block
    setDisplayBlock: (state, action) => {
      return { ...state, displayBlock: action.payload };
    },
    clearState: (state, action) => {
      return initialState;
    },
    toggleEditMode: (state, action) => {
      return { ...state, editMode: !state.editMode };
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
