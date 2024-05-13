import { createSlice } from "@reduxjs/toolkit";

const globalsSlice = createSlice({
  name: "globals",
  initialState: {
    language: {},
    languagesCount: 2,
    displayChapter: null,
    displayBlock: null,
    viewTab: "chapters",
    displayMode: "list",
    editMode: false,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
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
      if (displayBlock?.fourthLang !== "") {
        state.languagesCount = 4;
      } else if (displayBlock?.thirdLang !== "") {
        state.languagesCount = 3;
      } else {
        state.languagesCount = 2;
      }
      return state;
    },
    setLangaugesCount: (state, action) => {
      if (state.displayBlock?.fourthLang !== "") {
        state.languagesCount = 4;
      } else if (state.displayBlock?.thirdLang !== "") {
        state.languagesCount = 3;
      } else {
        state.languagesCount = 2;
      }
    },
    setViewTab: (state, action) => {
      const tab = action.payload;
      if (tab === "lesson") {
        if (
          !state.displayBlock ||
          Object.keys(state?.displayBlock).length === 0
        ) {
          if (
            !state.displayChapter ||
            Object.keys(state?.displayChapter).length === 0
          ) {
            state.viewTab = "chapters";
          } else {
            state.viewTab = "sections";
          }
        } else {
          state.viewTab = "lesson";
        }
      } else if (tab === "sections") {
        if (
          !state.displayChapter ||
          Object.keys(state?.displayChapter).length === 0
        ) {
          state.viewTab = "chapters";
        } else {
          state.viewTab = "sections";
        }
      } else {
        state.viewTab = "chapters";
      }
    },
    toggleDisplayMode: (state, action) => {
      if (state.displayMode === "block") {
        state.displayMode = "list";
      } else if (state?.displayMode === "list") {
        state.displayMode = "table";
      } else {
        state.displayMode = "block";
      }
    },
    toggleEditMode: (state, action) => {
      state.editMode = !state.editMode;
    },
  },
});

export const {
  setLanguage,
  setDisplayBlock,
  setLangaugesCount,
  setDisplayChapter,
  setViewTab,
  toggleDisplayMode,
  toggleEditMode,
} = globalsSlice.actions;

export default globalsSlice.reducer;

export const selectLanguage = (state) => state.globals.language;
export const selectDisplayChapter = (state) => state.globals.displayChapter;
export const selectDisplayBlock = (state) => state.globals.displayBlock;
export const selectLanguagesCount = (state) => state.globals.languagesCount;
export const selectViewTab = (state) => state.globals.viewTab;
export const selectDisplayMode = (state) => state.globals.displayMode;
export const selectEditMode = (state) => state.globals.editMode;
