import firebase from 'firebase';

export interface WorkItem {
  id?: string;
  title: string;
  details: string;
  size: string;
  priority: string;
  position: string;
  createdBy?: string;
  created?: firebase.firestore.Timestamp;
}


