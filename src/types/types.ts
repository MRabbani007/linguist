export type Dialogue = {
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

export type DialogueStatement = {
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
