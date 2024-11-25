import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private firestore: Firestore = inject(Firestore);

  private tasksCollection = collection(this.firestore, 'tasks');

  addTask(task: Task): Promise<void> {
    return addDoc(this.tasksCollection, task).then(() => {
      console.log('Task ajoutée avec succès');
    });
  }

  getTasks(userUID: string): Observable<Task[]> {
    const userTasksQuery = query(
      this.tasksCollection,
      where('userUID', '==', userUID)
    );
    return collectionData(userTasksQuery, { idField: 'id' }) as Observable<
      Task[]
    >;
  }

  deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc);
  }
}
