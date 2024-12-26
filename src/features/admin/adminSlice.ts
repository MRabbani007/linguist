import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  editMode: boolean;
  chaptersCount: number;
  lessonsCount: number;
  sectionsCount: number;
  definitionsCount: number;
  sentencesCount: number;
  wordsCount: number;
  usersCount: number;
}

const initialState: InitialState = {
  editMode: false,
  chaptersCount: 0,
  lessonsCount: 0,
  sectionsCount: 0,
  definitionsCount: 0,
  sentencesCount: 0,
  wordsCount: 0,
  usersCount: 0,
  // imageFolder: "images",
  // imagesFetch: {},
  // chapters: [],
  // lessons: [],
  // allCount: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setChapters: (state, action) => {
      return { ...state, chapters: action.payload };
    },
    setLessons: (state, action) => {
      return { ...state, lessons: action.payload };
    },
    setImageFolder: (state, action) => {
      return { ...state, imageFolder: action.payload };
    },
    setImagesFetch: (state, action) => {
      return { ...state, imagesFetch: action.payload };
    },
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
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    clearAdminState: () => {
      return initialState;
    },
  },
});

export const {
  setChapters,
  setLessons,
  setImageFolder,
  setImagesFetch,
  setChaptersCount,
  setLessonsCount,
  setSectionsCount,
  setDefinitionsCount,
  setWordsCount,
  setSentencesCount,
  toggleEditMode,
  clearAdminState,
} = adminSlice.actions;

export default adminSlice.reducer;

export const selectChaptersCount = (state: RootState) =>
  state.admin?.chaptersCount;
export const selectLessonsCount = (state: RootState) =>
  state.admin?.lessonsCount;
export const selectSectionsCount = (state: RootState) =>
  state.admin?.sectionsCount;
export const selectWordsCount = (state: RootState) => state.admin?.wordsCount;
export const selectSentencesCount = (state: RootState) =>
  state.admin?.sentencesCount;
export const selectEditMode = (state: RootState) => state.admin?.editMode;
