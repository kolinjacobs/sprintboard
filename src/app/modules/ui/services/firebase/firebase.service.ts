import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {WorkItem} from "../../models/work-item.model";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {switchMap} from 'rxjs/operators';
import * as moment from 'moment';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: firebase.User;


  constructor(private firestore: AngularFirestore, public auth: AngularFireAuth, private toastrService: NbToastrService) {
    this.auth.user.subscribe(user => {
      this.user = user;
    })
  }

  getWorkItems(search?: string): Observable<{items: Array<WorkItem>, backLogSize: number, sprintSize: number }> {
    return this.firestore.collection('work-items').valueChanges().pipe(switchMap( (x: Array<WorkItem>) => {
        if (search) {
          return of({ items: x.filter(i => i.title.includes(search)), backLogSize: x.filter(i => i.position === 'backlog').length, sprintSize: x.filter(i => i.position !== 'backlog').length});
        } else {
          return of({ items: x, backLogSize: x.filter(i => i.position === 'backlog').length, sprintSize: x.filter(i => i.position !== 'backlog').length});
        }
      })
    );
  }

  createWorkItem(workItem: WorkItem) {
    const created = workItem.created || moment(firebase.database.ServerValue.TIMESTAMP).toDate();
    this.firestore.collection('work-items').doc(workItem.id).set({ ...workItem, createdBy: this.user.email, created}).catch(() => this.toastrService.show(
      'Something went wrong',
      'error',
      { preventDuplicates: false, status: 'danger', icon: 'alert-circle-outline' })
    );
  }

  deleteWorkItem(id: string) {
    this.firestore.collection('work-items').doc(id).delete().then(x => console.log('item deleted')).catch(e => console.log(e));
  }

  searchWorkItemsByDate(s?: string): Observable<any> {
    if (s) {
      let date: Date;
      switch(s) {
        case '1d':
          date = moment().subtract(1, 'days').toDate();
          break;
        case '1w':
          date = moment().subtract(1, 'weeks').toDate();
          break;
        case '2w':
          date = moment().subtract(2, 'weeks').toDate();
          break;
        case '1m':
          date = moment().subtract(1, 'months').toDate();
          break;
      }
      return this.firestore.collection('work-items', ref => ref.where('created', '>', date)).valueChanges();
    } else {
      return this.firestore.collection('work-items').valueChanges();
    }
  }
}
