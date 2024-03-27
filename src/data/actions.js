export const ACTIONS = {
  ADD_WORD: "ADD_WORD",
  GET_WORD: "GET_WORD",
  GET_WORD: "GET_WORD_RANDOM",
  EDIT_WORD: "EDIT_WORD",
  EDIT_WORD_DETAILS: "EDIT_WORD_DETAILS",
  REMOVE_WORD: "REMOVE_WORD",

  ADD_BLOCK: "ADD_BLOCK",
  GET_BLOCK: "GET_BLOCK",
  EDIT_BLOCK: "EDIT_BLOCK",
  EDIT_BLOCK_HEADER: "EDIT_BLOCK_HEADER",
  EDIT_BLOCK_DETAILS: "EDIT_BLOCK_DETAILS",
  EDIT_BLOCK_CONTENT: "EDIT_BLOCK_CONTENT",
  REMOVE_BLOCK: "REMOVE_BLOCK",
  CLOSE_BLOCK: "CLOSE_BLOCK",

  ADD_CHAPTER: "ADD_CHAPTER",
  GET_CHAPTER: "GET_CHAPTER",
  EDIT_CHAPTER: "EDIT_CHAPTER",
  REMOVE_CHAPTER: "REMOVE_CHAPTER",

  USER_SIGNIN: "USER_SIGNIN",
  USER_SIGNUP: "USER_SIGNUP",
};

export const SERVER = {
  ADD_WORD: "/word/add",
  GET_WORD: "/word/getblock",
  GET_WORD_RANDOM: "/word/getrandom",
  EDIT_WORD: "/word/edit",
  EDIT_WORD_DETAILS: "/word/editdetails",
  REMOVE_WORD: "/word/remove",

  ADD_BLOCK: "/block/add",
  GET_BLOCK: "/block/get",
  EDIT_BLOCK: "/block/editblock",
  EDIT_BLOCK_HEADER: "/block/editheader",
  EDIT_BLOCK_DETAILS: "/block/editdetails",
  EDIT_BLOCK_CONTENT: "/block/editcontent",
  REMOVE_BLOCK: "/block/remove",

  ADD_CHAPTER: "/chapter/add",
  GET_CHAPTER: "/chapter/get",
  EDIT_CHAPTER: "/chapter/edit",
  REMOVE_CHAPTER: "/chapter/remove",

  USER_SIGNIN: "/user/auth",
  USER_SIGNUP: "/user/register",
  USER_REFRESH: "/user/refresh",
  USER_LOGOUT: "/user/logout",
};
