export interface Task {
  id?: string; 
  title: string;
  description: string;
  done: boolean;
  atDate: Date;
  userUID: string; 
}