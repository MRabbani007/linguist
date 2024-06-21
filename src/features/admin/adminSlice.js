import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editMode: false,
  chaptersCount: 0,
  lessonsCount: 0,
  sectionsCount: 0,
  definitionsCount: 0,
  sentencesCount: 0,
  wordsCount: 0,
  usersCount: 0,
  allCount: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setChaptersCount: (state, action) => {
      state.chaptersCount = action.payload;
      return state;
    },
    setLessonsCount: (state, action) => {
      state.lessonsCount = action.payload;
      return state;
    },
    setSectionsCount: (state, action) => {
      state.sectionsCount = action.payload;
      return state;
    },
    setDefinitionsCount: (state, action) => {
      state.definitionsCount = action.payload;
      return state;
    },
    setWordsCount: (state, action) => {
      state.wordsCount = action.payload;
      return state;
    },
    setSentencesCount: (state, action) => {
      state.sentencesCount = action.payload;
      return state;
    },
    setAllCount: (state, action) => {
      state.allCount = action.payload;
      return state;
    },
    toggleEditMode: (state, action) => {
      state.editMode = !state.editMode;
    },
    clearAdminState: (state, action) => {
      return initialState;
    },
  },
});

export const {
  setChaptersCount,
  setLessonsCount,
  setSectionsCount,
  setDefinitionsCount,
  setWordsCount,
  setSentencesCount,
  setAllCount,
  toggleEditMode,
  clearAdminState,
} = adminSlice.actions;

export default adminSlice.reducer;

export const selectChaptersCount = (state) => state.admin?.chaptersCount;
export const selectLessonsCount = (state) => state.admin?.lessonsCount;
export const selectSectionsCount = (state) => state.admin?.sectionsCount;
export const selectDefinitionsCount = (state) => state.admin?.defintionsCount;
export const selectWordsCount = (state) => state.admin?.wordsCount;
export const selectSentencesCount = (state) => state.admin?.sentencesCount;
export const selectAllCount = (state) => state.admin?.allCount;
