import { createSlice } from "@reduxjs/toolkit";

const globalsSlice = createSlice({
  name: "globals",
  initialState: {
    displayChapter: null,
    displayBlock: null,
    viewTab: "chapters",
    displayMode: "block",
    editMode: false,
  },
  reducers: {
    // called to open chapter
    setDisplayChapter: (state, action) => {
      state.displayChapter = action.payload;
      return state;
    },
    // called to open block
    setDisplayBlock: (state, action) => {
      state.displayBlock = action.payload;
      return state;
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
  setDisplayBlock,
  setDisplayChapter,
  setViewTab,
  toggleDisplayMode,
  toggleEditMode,
} = globalsSlice.actions;

export default globalsSlice.reducer;

export const selectDisplayChapter = (state) => state.globals.displayChapter;
export const selectDisplayBlock = (state) => state.globals.displayBlock;
export const selectViewTab = (state) => state.globals.viewTab;
export const selectDisplayMode = (state) => state.globals.displayMode;
export const selectEditMode = (state) => state.globals.editMode;
