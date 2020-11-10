import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FirebaseService} from "../../services/firebase/firebase.service";
import {WorkItem} from "../../models/work-item.model";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  todo: Array<WorkItem> = [];
  inProgress: Array<WorkItem> = [];
  done: Array<WorkItem> = [];
  color = {
    ['high']: 'danger',
    ['medium']: 'warning',
    ['low']: 'primary'
  };

  constructor(private fbService: FirebaseService) { }

  ngOnInit(): void {
    this.fbService.getWorkItems().subscribe(x => {
      if (x) {
        this.todo = x.items.filter(i => i.position === 'todo');
        this.inProgress = x.items.filter(i => i.position === 'inprogress');
        this.done = x.items.filter(i => i.position === 'done');
      }
    })
  }

  drop(event: CdkDragDrop<WorkItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const currentItem = (event.container.data[event.currentIndex] as WorkItem);
      const isTodo = this.todo.some(i => i.id === currentItem.id);
      const isInProgress = this.inProgress.some(i => i.id === currentItem.id);
      const position = isTodo ? 'todo' : isInProgress ? 'inprogress' : 'done';
      this.fbService.createWorkItem({ ...currentItem, position });
    }
  }
}
