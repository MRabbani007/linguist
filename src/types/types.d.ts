declare global {
  type QueryResponse<T> = {
    data: T[];
    count: number;
  };

  type Language = {
    id: string;
    label?: string;
    slug?: string;
    name: string;
    title: string;
    subtitle: string;
    text: string;
    detail?: string;
    image?: string;
    learningTime: number;
    sortIndex: number;
    visible: boolean;
  };

  type Chapter = {
    id: string;
    title: string;
    subtitle: string;
    detail: string;
    chapterNo: number;
    sortIndex: number;
    level: string;
    learningTime: number;
    visible: boolean;
    state?: string;
    status?: string;
  };

  type Lesson = {
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

  type Section = {
    id: string;
    userID?: string;
    chapterID: string;
    lessonID: string;

    sectionNo?: number;
    sortIndex?: number;

    title: string;
    subtitle?: string;
    detail?: string;
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

  type ContentSection = Section & {
    definitions: Definition[];
    words: Word[];
    sentences: Sentence[];
    sectionLists: SectionList[];
    tables: (ConjTable & { tableWords: TableWord[] })[];
    textBlocks: TextBlock[];
  };

  type TextBlock = {
    id: string;
    sortIndex: number;
    lessonID: string;
    sectionID: string;
    title: string;
    label: string;
    text: string;
    caption: string;
    information: string;
    scope: string; // chapter, lesson, section
    type: string; // introduction, conclusion, note, tip
    displayType: string; // sentence, bullet point, tip block
  };

  type Definition = {
    id: string;
    sortIndex: number;
    lessionID: string;
    sectionID: string;
    title: string;
    text: string;
    notes: string;
    caption: string;
  };

  type SectionList = {
    id: string;
    lessonID: string;
    sectionID: string;
    type: string;
    title: string;
    text: string;
    notes: string;
    sortIndex: number;
    items: string[];
  };

  type ConjTable = {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    notes: string;
    caption: string;
    colsTitles: string[];
    colsTitlesColSpan: number[];
    cols: string[];
    colsColSpan: number[];
    rows: string[];
  };

  type TableWord = {
    id: string;
    tableID: string;
    cases: string[];
  };

  type Sentence = {
    id: string;
    sectionID: string;
    lessonID: string;
    sortIndex: number;

    text: string;
    caption: string;
    translation: string;
    tCaption?: string;
    pronunce: string;
    note: string;

    level: number;
    type: string;
    group?: string;
    exercises?: string;

    baseWordID?: string;
    baseWord?: string;
    baseWordTranslation?: string;

    show: boolean;
    display?: string;
  };

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

  type DialogueByID = { dialogue: Dialogue; statements: DialogueStatement[] };

  type Word = {
    id: string;
    // Header
    userID?: string;
    chapterID?: string;
    blockID?: string; // stores lessonID in the DB
    lessonID?: string; // temporary to send lessonID to backend on create/edit word
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
    image?: string;
    imageURL?: string;
    // example sentences
    sentences?: string[];
    sentencesTranslation?: string[];
    baseWord?: string;

    // flag for using word in exercises
    exercises?: string;

    // Grammatical type of word: verb, noun, pronoun, proverb, phrase
    type?: string;
    gender?: string;
    form?: string;

    note?: string;

    level?: string;
    subject?: string;

    group?: string;

    // display type of word: list or card
    display?: string;
    // show or hide word
    showWord?: boolean;
    // for sorting
    sortIndex: number;
    createDate?: Date | string;
  };

  // Organizational types for Word
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

  type LessonStatus = {
    id: string;
    lessonID: string;
    status: string;
  };

  type UserProfile = {
    selectedLanguage: string;
    scoreMatchWords: number;
    lessonStatus: LessonStatus[];
  };

  type WordList = {
    name: string;
    userID: string;
    id: string;
  };

  type WordData = {
    wordID: string;
    listID: string;
    repeatCount: number;
    id: string;
  };

  type FolderMeta = { name: string; fullPath: string };
  type FileMeta = { imageURL: string; filename: string; foldername: string };
  type ImageMeta = {
    id: string;
    filename: string;
    foldername: string;
    imageURL: string;
  };
}

export {};
