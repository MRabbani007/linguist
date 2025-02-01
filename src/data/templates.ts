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

export const T_DEFINITION: Definition = {
  id: "",
  lessionID: "",
  sectionID: "",
  sortIndex: 0,
  title: "",
  text: "",
  caption: "",
  notes: "",
};

export const T_WORD: Word = {
  id: "",

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

export const T_SENTENCE: Sentence = {
  id: "",
  sectionID: "",
  lessonID: "",
  sortIndex: 0,
  text: "",
  translation: "",
  pronunce: "",
  caption: "",
  note: "",
  type: "",
  baseWord: "",
  baseWordID: "",
  baseWordTranslation: "",
  show: true,
  level: 1,
};

export const T_CHAPTER: Chapter = {
  id: "",
  title: "",
  subtitle: "",
  detail: "",
  chapterNo: 0,
  sortIndex: 0,
  level: "",
  learningTime: 0,
  visible: false,
  state: "public",
  status: "draft",
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

export const T_TEXTBLOCK: TextBlock = {
  id: "",
  sortIndex: 100,
  lessonID: "",
  sectionID: "",
  title: "",
  label: "",
  text: "",
  caption: "",
  information: "",
  scope: "", // chapter, lesson, section
  type: "", // introduction, conclusion, note, tip
  displayType: "", // sentence, bullet point, tip block
};

export const T_SECTIONLIST: SectionList = {
  id: "",
  lessonID: "",
  sectionID: "",
  type: "UL",
  title: "",
  text: "",
  notes: "",
  sortIndex: 0,
  items: [],
};

export const T_ATTRIBUTE: WordAttr = {
  id: "",
  label: "",
  slug: "",
};

export const T_VALUE: AttributeValue = {
  id: "",
  attrID: "",
  label: "",
  slug: "",
  abbrev: "",
  shortHand: "",
};

export const T_ADMINUSER: AdminUser = {
  id: "",
  rolesAdmin: 0,
  rolesEditor: 0,
  rolesUser: 0,
  username: "",
  email: "",
  roles: [],
};
