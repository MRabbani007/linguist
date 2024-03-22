import { ACTIONS } from "../data/actions";

export const appReducer = (state, action) => {
  try {
    const { type, payload } = action;

    switch (action.type) {
      case ACTIONS.GET_CHAPTER: {
        return {
          ...state,
          chapters: [...action.payload],
        };
      }
      case ACTIONS.ADD_CHAPTER: {
        return {
          ...state,
          chapters: [...state.chapters, action.payload],
        };
      }
      case ACTIONS.EDIT_CHAPTER: {
        let { id, title, subtitle, detail } = action.payload;
        let oldChapterIndex = state.chapters.findIndex(
          (item) => item.id === id
        );
        let newChapter = {
          ...state.chapters[oldChapterIndex],
          title,
          subtitle,
          detail,
        };
        state.chapters.splice(oldChapterIndex, 1, newChapter);
        return {
          ...state,
          chapters: [...state.chapters],
        };
      }
      case ACTIONS.REMOVE_CHAPTER: {
        let { id } = action.payload;
        console.log(
          id,
          state.chapters.filter((chapter) => chapter.id !== id)
        );
        return {
          ...state,
          chapters: [...state.chapters.filter((chapter) => chapter.id !== id)],
        };
      }
      case ACTIONS.GET_BLOCK: {
        return {
          ...state,
          blocks: [...action.payload],
        };
      }
      case ACTIONS.ADD_BLOCK: {
        return {
          ...state,
          blocks: [...state.blocks, action.payload],
        };
      }
      case ACTIONS.EDIT_BLOCK_HEADER: {
        let oldBlockIndex = state.blocks.findIndex(
          (item) => item.id === payload.id
        );
        let newBlock = {
          ...state.blocks[oldBlockIndex],
          ...payload,
        };
        state.blocks.splice(oldBlockIndex, 1, newBlock);
        return {
          ...state,
        };
      }
      case ACTIONS.EDIT_BLOCK_DETAILS: {
        let oldBlockIndex = state.blocks.findIndex(
          (item) => item.id === payload.id
        );
        let newBlock = {
          ...state.blocks[oldBlockIndex],
          ...payload,
        };
        state.blocks.splice(oldBlockIndex, 1, newBlock);
        return {
          ...state,
        };
      }
      // Remove words from local memory when block is closed
      case ACTIONS.CLOSE_BLOCK: {
        let newWords = state.words.filter(
          (item) => item.blockID !== action.payload
        );
        return {
          ...state,
          words: newWords,
        };
      }
      case ACTIONS.ADD_WORD: {
        return {
          ...state,
          words: [...state.words, action.payload],
        };
      }
      case ACTIONS.GET_WORD: {
        const temp = state.words.filter(
          (word) => word.blockID !== payload[0].blockID
        );
        return {
          ...state,
          words: [...payload, ...temp],
        };
      }
      case ACTIONS.EDIT_WORD: {
        let wordIndex = state.words.findIndex((item) => item.id === payload.id);
        state.words.splice(wordIndex, 1, payload);
        return {
          ...state,
        };
      }
      case ACTIONS.REMOVE_WORD: {
        return {
          ...state,
          words: [
            ...state.words.filter((word) => word.id !== action.payload.id),
          ],
        };
      }
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
    console.log("Error: Reducer");
  }
};
