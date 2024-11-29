import { map, Observable, switchMap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Auth, authState, User as UserFromFirebase } from '@angular/fire/auth';
import { User } from '../../interfaces/User';
import { Firestore, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly authFirebase = inject(Auth);
  private readonly firestore = inject(Firestore);

  getUserDataFromFirebase(): Observable<User> {
    return authState(this.authFirebase).pipe(
      switchMap((userFirebase: UserFromFirebase) => {
        if (!userFirebase) throw new Error('User not authenticated');
        const userDocRef = doc(this.firestore, 'users', userFirebase.uid);
        return docData(userDocRef) as Observable<User>;
      }),
    );
  }

  getURLImage(): Observable<string> {
    return this.getUserDataFromFirebase().pipe(
      map((user: User) => {
        return user.imageURL;
      }),
    );
  }
}
