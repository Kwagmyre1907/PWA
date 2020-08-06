import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {MyDB} from '../models/my-db';
import {IDBPDatabase, openDB} from 'idb';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private db: IDBPDatabase<MyDB>;
  keyCount: number;

  payload: NotificationOptions = {
    badge: '../../favicon.ico',
    body: 'Request will be sent when the problem is resolved',
    dir: 'ltr',
    icon: '../../favicon.ico',
    tag: 'confirm-notification',
    renotify: true,
    vibrate: [100, 50, 200],
    actions: [
      {action: 'confirm', title: 'Okay, Cool', icon: '../../favicon.ico'},
      // {action: 'cancel', title: 'Nope', icon: '../../favicon.ico'},
    ]
  };

  constructor() {
    this.keyCount = 0;
    this.connectToDB();
    this.payload = {
      badge: '../../favicon.ico',
      body: 'Request will be sent when the problem is resolved',
      dir: 'ltr',
      icon: '../../favicon.ico',
      tag: 'confirm-notification',
      renotify: true,
      vibrate: [100, 50, 200],
      actions: [
        {action: 'confirm', title: 'Okay, Cool', icon: '../../favicon.ico'},
        // {action: 'cancel', title: 'Nope', icon: '../../favicon.ico'},
      ]
    };
  }

  async connectToDB() {
    this.db = await openDB<MyDB>('my-db', 1, {
        upgrade(mydb) {
          mydb.createObjectStore('post-store');
        }
      });
  }

  addPost(obj: string, key: string) {
    this.keyCount ++;
    return this.db.put('post-store', obj, key);
  }

  deletePost(key: string) {
    return this.db.delete('post-store', key);
  }

  handelError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},` +
        `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  async backgroundSync(data: any, url: string) {
    const dbData = JSON.stringify(data);
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      this.addPost(dbData, url).then(
        () => {
          navigator.serviceWorker.ready
            .then(sw => {
              sw.sync.register('back-sync');
              sw.showNotification('Oops! Seems like there is a problem...', this.payload);
            })
            .catch(console.log);
        }
      );
    }
  }

  sendNotification(title: string, body: string) {
    console.log('sendNotification: ', title, body);
    this.payload.body = body;
    console.log('sendNotification: ', title, this.payload);
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready
        .then(sw => {
          sw.showNotification(title, this.payload);
        })
        .catch(console.log);
    }
  }
}
