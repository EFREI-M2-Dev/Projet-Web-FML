import { Timestamp } from 'firebase/firestore';

export interface Task {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  atDate: Date;
  userUID: string;
}

export interface TaskResponse {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  atDate: Timestamp;
  userUID: string;
}
