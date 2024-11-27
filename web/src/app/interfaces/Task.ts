import { Timestamp } from 'firebase/firestore';

export interface Task {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  atDate: Date;
  userUID: string;
  thematic: string;
  thematicLabel?: string;
  thematicColor?: string;
}

export interface TaskDoc {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  atDate: Timestamp;
  userUID: string;
  thematic: string;
}

export interface NewTask {
  title: string;
  description: string;
  atDate: Date;
  thematic: string;
}
