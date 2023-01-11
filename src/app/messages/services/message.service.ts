import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IMessage } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private dbPath = '/messages';
  messagesRef: AngularFirestoreCollection<IMessage>;

  constructor(private db: AngularFirestore) {
    this.messagesRef = this.db.collection(this.dbPath);
  }

  getAll(): Observable<DocumentChangeAction<IMessage>[]> {
    return this.messagesRef.snapshotChanges();
  }

  create(message: IMessage): Observable<DocumentChangeAction<IMessage>[]> {
    this.messagesRef.add({ ...message });
    return this.messagesRef.snapshotChanges();
  }
}
