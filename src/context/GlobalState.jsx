import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { appReducer } from "./AppReducer";
// Imported Data
import { ACTIONS, SERVER } from "../data/actions";
import AuthContext from "./AuthProvider";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";

// Initial state
const initialState = {
  chapters: [],
  blocks: [],
  words: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Store Data
  const [state, dispatch] = useReducer(appReducer, initialState);

  const [displayChapter, setDisplayChapter] = useState("");
  const [displayBlock, setDisplayBlock] = useState([]);

  const [viewTab, setViewTab] = useState("chapters");
  const [editMode, setEditMode] = useState(false);

  const handleViewTab = (tab) => {
    if (tab === "lesson") {
      if (Object.keys(displayBlock).length === 0) {
        setViewTab("sections");
      } else {
        setViewTab("lesson");
      }
    } else {
      setViewTab(tab);
    }
  };

  // Handle Sidebar
  const [viewSideBar, setViewSideBar] = useState(false);
  const handleSideBar = (value = 1) => {
    if (value === true || value === false) {
      setViewSideBar(value);
    } else {
      setViewSideBar(!viewSideBar);
    }
  };

  const handleChapterOpen = (chapter) => {
    handleSideBar(false);
    handleBlockGet(chapter.id);
    setDisplayChapter(chapter);
    setViewTab("sections");
    // setDisplayBlock([]);
    navigate("/chapters", { replace: true });
  };

  const handleChapterAdd = async (title = "", subtitle = "", detail = "") => {
    let chapter = {
      id: crypto.randomUUID(),
      title,
      subtitle,
      detail,
    };
    dispatch({
      type: ACTIONS.ADD_CHAPTER,
      payload: chapter,
    });

    let data = await axiosPrivate.post(SERVER.ADD_CHAPTER, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ADD_CHAPTER,
        payload: { chapter },
      },
    });
  };

  const handleChaptersGet = async () => {
    try {
      let response = await axiosPrivate.post(SERVER.GET_CHAPTER, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.GET_CHAPTER,
          payload: {
            userName: auth?.user,
            roles: auth?.roles,
            token: auth?.accessToken,
          },
        },
      });

      if (Array.isArray(response?.data)) {
        dispatch({ type: ACTIONS.GET_CHAPTER, payload: response?.data });
        // handleChapterOpen(response.data[0]);
      }
    } catch (error) {
      console.log("Error: get chapters");
    }
  };

  const handleChapterEdit = async (
    id,
    title,
    subtitle,
    detail,
    state = "private"
  ) => {
    let chapter = {
      id,
      title,
      subtitle,
      detail,
      state,
    };
    dispatch({ type: ACTIONS.EDIT_CHAPTER, payload: chapter });

    let data = await axiosPrivate.post(SERVER.EDIT_CHAPTER, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.EDIT_CHAPTER,
        payload: { userName: auth?.user, chapter },
      },
    });

    if (displayChapter.id === id) {
      setDisplayChapter((current) => {
        return { ...current, title, subtitle, detail, state };
      });
    }
  };

  const handleChapterRemove = async (id) => {
    dispatch({ type: ACTIONS.REMOVE_CHAPTER, payload: { id } });

    let data = await axiosPrivate.post(SERVER.REMOVE_CHAPTER, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.REMOVE_CHAPTER,
        payload: { userName: auth?.user, id },
      },
    });
  };

  const handleBlockGet = async (chapterID) => {
    try {
      let response = await axiosPrivate.post(SERVER.GET_BLOCK, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.GET_BLOCK,
          payload: { userName: auth?.user, chapterID: chapterID },
        },
      });

      if (Array.isArray(response?.data)) {
        dispatch({ type: ACTIONS.GET_BLOCK, payload: response?.data });
      }
    } catch (error) {
      console.log("Error: Get Section");
    }
  };

  const handleBlockAdd = async (title = "", subtitle = "", detail = "") => {
    let block = {
      id: crypto.randomUUID(),
      chapterID: displayChapter.id,
      title,
      subtitle,
      detail,
    };

    dispatch({ type: ACTIONS.ADD_BLOCK, payload: block });

    let data = await axiosPrivate.post(SERVER.ADD_BLOCK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ADD_BLOCK,
        payload: { userName: auth?.user, block },
      },
    });
  };

  const handleBlockEditHeader = async (blockID, title, subtitle, detail) => {
    let block = {
      id: blockID,
      chapterID: displayChapter.id,
      title,
      subtitle,
      detail,
    };

    dispatch({ type: ACTIONS.EDIT_BLOCK_HEADER, payload: block });
    setDisplayBlock((current) => {
      let blockIndex = current.indexOf((item) => item.id === blockID);
      current.splice(blockIndex, 1, block);
      return [...current];
    });

    let data = await axiosPrivate.post(SERVER.EDIT_BLOCK_HEADER, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.EDIT_BLOCK_HEADER,
        payload: { userName: auth?.user, block },
      },
    });
  };

  const handleBlockEditDetail = async (
    blockID = "",
    firstLang = "",
    secondLang = "",
    thirdLang = "",
    fourthLang = ""
  ) => {
    let block = {
      id: blockID,
      chapterID: displayChapter.id,
      firstLang,
      secondLang,
      thirdLang,
      fourthLang,
    };

    dispatch({ type: ACTIONS.EDIT_BLOCK_DETAILS, payload: block });

    setDisplayBlock((current) => {
      let blockIndex = current.indexOf((item) => item.id === blockID);
      current.splice(blockIndex, 1, { ...displayBlock[0], ...block });
      return [...current];
    });

    let data = await axiosPrivate.post(SERVER.EDIT_BLOCK_DETAILS, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.EDIT_BLOCK_DETAILS,
        payload: { userName: auth?.user, block },
      },
    });
  };

  const handleBlockDeleteLang = async (blockID, index) => {};

  const handleBlockOpen = (block) => {
    handleWordGet(block.id);
    setDisplayBlock([block]);
    handleViewTab("lesson");
    // setDisplayBlock((current) => {
    //   let newDisplayBlock = current.filter((item) => item.id !== block.id);
    //   return [...newDisplayBlock, block];
    // });
  };

  const handleBlockClose = (blockID) => {
    // setDisplayBlock((current) => {
    //   let newDisplayBlock = current.filter((item) => item.id !== blockID);
    //   return [...newDisplayBlock];
    // });
    setDisplayBlock([]);
    dispatch({ type: ACTIONS.CLOSE_BLOCK, payload: blockID });
  };

  const handleWordGet = async (blockID) => {
    let response = await axiosPrivate.post(SERVER.GET_WORD, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_WORD,
        payload: {
          userName: auth?.user,
          chapterID: displayChapter,
          blockID: blockID,
        },
      },
    });

    if (Array.isArray(response?.data)) {
      dispatch({ type: ACTIONS.GET_WORD, payload: response.data });
    }
  };

  const handleWordAdd = async (blockID, newWord) => {
    let word = {
      id: crypto.randomUUID(),
      chapterID: displayChapter.id,
      blockID,
      ...newWord,
    };

    dispatch({
      type: ACTIONS.ADD_WORD,
      payload: word,
    });

    let data = await axiosPrivate.post(SERVER.ADD_WORD, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ADD_WORD,
        payload: { userName: auth?.user, word },
      },
    });
  };

  const handleWordEdit = async (newWord) => {
    dispatch({
      type: ACTIONS.EDIT_WORD,
      payload: newWord,
    });

    let data = await axiosPrivate.post(SERVER.EDIT_WORD, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.EDIT_WORD,
        payload: {
          userName: auth?.user,
          word: newWord,
        },
      },
    });
  };

  const handleWordDelete = async (id) => {
    dispatch({
      type: ACTIONS.REMOVE_WORD,
      payload: { id, chapterID: displayChapter.id, blockID: displayBlock.id },
    });

    let data = await axiosPrivate.post(SERVER.REMOVE_WORD, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.REMOVE_WORD,
        payload: {
          userName: auth?.user,
          word: {
            id,
            chapterID: displayChapter.id,
            blockID: displayBlock[0].id,
          },
        },
      },
    });
  };

  const handleToggleEditMode = () => {
    if (auth?.roles && auth.roles.find((item) => item === 5150)) {
      setEditMode(!editMode);
    }
  };

  useEffect(() => {
    handleChaptersGet();
    if (auth?.user) {
    }
  }, [auth]);

  return (
    <GlobalContext.Provider
      value={{
        viewSideBar,
        chapters: state.chapters,
        blocks: state.blocks,
        words: state.words,
        displayChapter,
        displayBlock: displayBlock[0],
        handleSideBar,
        viewTab,
        handleViewTab,
        editMode,
        handleToggleEditMode,

        handleWordGet,
        handleWordAdd,
        handleWordEdit,
        handleWordDelete,

        handleChapterAdd,
        handleChapterOpen,
        handleChapterEdit,
        handleChapterRemove,
        handleBlockAdd,
        handleBlockOpen,
        handleBlockClose,
        handleBlockEditHeader,
        handleBlockEditDetail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
