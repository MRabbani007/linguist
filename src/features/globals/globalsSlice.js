import { createSlice } from "@reduxjs/toolkit";

const globalsSlice = createSlice({
  name: "globals",
  initialState: {
    language: {},
    displayChapter: null,
    displayBlock: null,
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
      return state;
    },
    toggleEditMode: (state, action) => {
      state.editMode = !state.editMode;
    },
  },
});

export const {
  setLanguage,
  setDisplayBlock,
  setDisplayChapter,
  toggleEditMode,
} = globalsSlice.actions;

export default globalsSlice.reducer;

export const selectLanguage = (state) => state.globals.language;
export const selectDisplayChapter = (state) => state.globals.displayChapter;
export const selectDisplayBlock = (state) => state.globals.displayBlock;
export const selectEditMode = (state) => state.globals.editMode;
