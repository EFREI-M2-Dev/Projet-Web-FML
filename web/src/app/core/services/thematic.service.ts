import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Thematic } from '../../interfaces/Thematic';

@Injectable({
  providedIn: 'root',
})
export class ThematicService {
  private firestore: Firestore = inject(Firestore);

  private thematicsCollection = collection(this.firestore, 'thematics');

  getThematics(): Observable<Thematic[]> {
    return collectionData(this.thematicsCollection, { idField: 'id' }) as Observable<Thematic[]>;
  }
}
