type Dialogue = {
  id: string;
  sortIndex: number;

  title: string;
  subtitle: string;
  notes: string;

  subject: string;
  level: string;

  people: string[];

  createdAt?: Date;
  updatedAt?: Date;
};

type DialogueStatement = {
  id: string;
  dialogueID: string;

  person: string;

  text: string;
  caption?: string;
  translation: string;
  t_caption?: string;
  pronunce?: string;
  note?: string;
  image?: string;

  // flag for using in exercises
  exercises?: string;
  level?: string;
  difficulty?: number;
  group?: string;
  // show or hide
  show?: boolean;
  // for sorting
  sortIndex: number;

  createdAt?: Date;
  updatedAt?: Date;
};

type Section = {
  id: string;
  userID?: string;
  chapterID: string;
  lessonID: string;

  sectionNo?: number;
  sortIndex?: number;

  title: string;
  subtitle?: string;
  introduction?: string[];
  text?: string[];
  summary?: string[];
  notes?: string[];

  subject?: string;
  display?: string;

  image?: string;
  imageCaption?: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

type Word = {
  id: string;
  // Header
  userID?: string;
  chapterID?: string;
  blockID?: string;
  sectionID?: string;
  // Content
  // main language
  first: string;
  firstCaption: string;
  // second language
  second: string;
  secondCaption: string;
  // pronunciation
  third: string;
  fourth: string;
  image: string;
  imageURL: string;
  // example sentences
  sentences: string[];
  sentencesTranslation: string[];
  baseWord: string;

  // flag for using word in exercises
  exercises: string;

  // Grammatical type of word: verb, noun, pronoun, proverb, phrase
  type: string;
  gender: string;
  form: string;
  note: string;

  level: string;
  subject: string;

  group: string;

  // display type of word: list or card
  display: string;
  // show or hide word
  showWord: boolean;
  // for sorting
  sortIndex: number;
  createDate?: Date | string;
};

type Definition = {};

declare type SectionList = {
  id: string;
  lessonID: string;
  sectionID: string;
  type: string;
  title: string;
  text: string;
  notes: string;
  sortIndex: number;
};

declare type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  chapterNo: number;
  level: string;
  learningTime: number;
};

declare type Lesson = {
  chapterID: string;
  state: string; // lesson status = draft / published

  id: string;
  title: string;
  subtitle: string;
  detail: string;
  caption: string;

  lessonNo: number;
  sortIndex: number;

  firstLang: string;
  secondLang: string;
  thirdLang: string;
  fourthLang: string;

  lessonImage?: string;
  level: string;
  learningTime: number;

  imagesURL?: string; // not required
  displayMode?: string; // not required
  userID?: string; // not required

  introduction: string[]; // move to separate schema
  text: string[]; // move to separate schema
  notes: string[]; // move to separate schema

  createDate?: string; // add mongoose time stamps
};

type WordAttr = {
  id: string;
  label: string;
  slug: string;
};

type AttributeValue = {
  id: string;
  attrID: string;
  label: string;
  slug: string;
  abbrev: string;
  shortHand: string;
};

type WordAttribute = WordAttr & { values: AttributeValue[] };
