export const tableTemplateVerb = {
  id: "",
  title: "Table Tile",
  subtitle: "Table Sub-Title",
  text: "Text",
  notes: "Notes",
  caption: "Caption",
  colsTitles: [],
  colsTitlesColSpan: [],
  cols: ["Russian", "English"],
  colsColSpan: [1, 1],
  rows: ["Я", "Ты", "Он, Она, Оно", "Мы", "Вы", "Они"],
  showRows: false,
  sortIndex: 9,
};

export const tableTemplatePronouns = {
  id: "",
  title: "Table Tile",
  subtitle: "Table Sub-Title",
  text: "Text",
  notes: "Notes",
  caption: "Caption",
  colsTitles: [],
  colsTitlesColSpan: [],
  cols: ["Russian", "English"],
  colsColSpan: [1, 1],
  rows: ["I", "You", "He", "She", "It", "You", "We", "They"],
  showRows: false,
  sortIndex: 9,
};

export const tableTemplateAdjective = {
  id: "",
  title: "Adjective",
  subtitle: "Sub-Title",
  text: "Text",
  notes: "Notes",
  caption: "Adjective",
  colsTitles: [],
  colsTitlesColSpan: [],
  cols: ["Musculine", "Feminine", "Neuter", "Plural"],
  colsColSpan: [1, 1, 1, 1],
  rows: [
    "Nominative Case",
    "Accusative Case",
    "Genitive Case",
    "Dative Case",
    "Instrumental Case",
    "Prepositional Case",
  ],
  showRows: false,
  sortIndex: 9,
};

export const DefinitionTemplate = {
  sortIndex: 0,
  title: "",
  text: "",
  caption: "",
  notes: "",
};

export const T_WORD = {
  sortIndex: 0,
  first: "",
  second: "",
  third: "",
  fourth: "",
  firstCaption: "",
  secondCaption: "",
  type: "",
  gender: "",
  sectionID: "",
};

export const T_CHAPTER: Chapter = {
  id: "",
  title: "",
  subtitle: "",
  detail: "",
  chapterNo: 0,
  level: "",
  learningTime: 0,
};

export const T_LESSON: Lesson = {
  chapterID: "",
  state: "draft",

  id: "",
  title: "",
  subtitle: "",
  detail: "",
  caption: "",

  lessonNo: 0,
  sortIndex: 0,

  firstLang: "",
  secondLang: "",
  thirdLang: "",
  fourthLang: "",

  introduction: [],
  text: [],
  notes: [],

  imagesURL: "",
  level: "beginner",
  learningTime: 0,
};