import { map, Observable, switchMap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Auth, authState, User as UserFromFirebase } from '@angular/fire/auth';
import { User } from '../../interfaces/User';
import { Firestore, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly authFirebase = inject(Auth);
  private readonly firestore = inject(Firestore);

  getUserDataFromFirebase(): Observable<User> {
    return authState(this.authFirebase).pipe(
      switchMap((userFirebase: UserFromFirebase) => {
        if (!userFirebase) {
          throw new Error('User not authenticated');
        }
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

  setURLImage(link: string): Promise<void> {
    return authState(this.authFirebase)
      .pipe(
        switchMap((userFirebase: UserFromFirebase) => {
          if (!userFirebase) {
            throw new Error('User not authenticated');
          }
          const userDocRef = doc(this.firestore, 'users', userFirebase.uid);
          return updateDoc(userDocRef, { imageURL: link }); // Met à jour le champ `imageURL`
        }),
      )
      .toPromise(); // Convertit l'observable en une promesse si tu veux retourner une promesse
  }

  public createUserDocumentWithId(docId: string, imageURL: string, name: string): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', docId); // Spécifie l'ID du document

    const newUser = {
      imageURL: imageURL,
      name: name,
    };

    return setDoc(userDocRef, newUser)
      .then(() => console.log(`Document with ID ${docId} created successfully`))
      .catch((error) => console.error('Error creating document:', error));
  }
}
