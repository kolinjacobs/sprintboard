import {WorkItem} from './work-item.model';
import firebase from 'firebase';

// B. encapsulation
export class WorkItemBase implements WorkItem {
  constructor(x: WorkItem) {
    this.id = x.id;
    this.title = x.title;
    this.details = x.details;
    this.priority = x.priority;
    this.position = x.position;
    this.size = x.size;
    this.created = x.created;
    this.createdBy = x.createdBy;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = value;
  }
  get priority(): string {
    return this._priority;
  }

  set priority(value: string) {
    this._priority = value;
  }
  get position(): string {
    return this._position;
  }

  set position(value: string) {
    this._position = value;
  }
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
  get details(): string {
    return this._details;
  }

  set details(value: string) {
    this._details = value;
  }
  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }
  get created(): firebase.firestore.Timestamp {
    return this._created;
  }

  set created(value: firebase.firestore.Timestamp) {
    this._created = value;
  }

  private _created: firebase.firestore.Timestamp;
  private _createdBy: string;
  private _details: string;
  private _id: string;
  private _position: string;
  private _priority: string;
  private _size: string;
  private _title: string;

  public getType(): string {
    return 'default';
  }
}