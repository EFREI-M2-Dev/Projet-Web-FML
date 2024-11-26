import { Timestamp } from 'firebase/firestore';

export interface Task {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  atDate: Date;
  userUID: string;
}

export interface TaskDoc {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  atDate: Timestamp;
  userUID: string;
}

export interface NewTask {
  title: string;
  description: string;
  atDate: Date;
}