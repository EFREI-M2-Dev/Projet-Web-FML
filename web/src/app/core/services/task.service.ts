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
  updateDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Task, TaskResponse } from '../../interfaces/Task';

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
    return collectionData(userTasksQuery, { idField: 'id' }).pipe(
      map((tasks: TaskResponse[]) =>
        tasks.map((task) => ({
          ...task,
          atDate: task.atDate.toDate(),
        }))
      )
    ) as Observable<Task[]>;
  }

  updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${taskId}`);
    return updateDoc(taskDoc, updates).then(() => {
      console.log(`Task ${taskId} mise à jour avec succès`);
    });
  }

  deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc);
  }
}
