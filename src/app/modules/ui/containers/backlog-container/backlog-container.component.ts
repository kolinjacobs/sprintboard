import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase/firebase.service";
import {WorkItem} from "../../models/work-item.model";
import { POSITIONS } from "../../constants/position.constants";
import {NbDialogService, NbWindowService} from "@nebular/theme";
import {WorkItemCreateComponent} from "../../components/work-item-create/work-item-create.component";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';
import firebase from 'firebase';
import {WorkItemBase} from '../../models/work-item-base.class';
import {WorkItemSprint} from '../../models/work-item-sprint.class';
import {WorkItemBacklog} from '../../models/work-item-backlog.class';

@Component({
  selector: 'app-backlog-container',
  templateUrl: './backlog-container.component.html',
  styleUrls: ['./backlog-container.component.scss']
})
export class BacklogContainerComponent implements OnInit {
  backlog: Array<WorkItemBase> = [];
  sprint: Array<WorkItemBase> = [];
  positions = POSITIONS;
  searchTerm = '';
  color = {
    ['high']: 'danger',
    ['medium']: 'warning',
    ['low']: 'primary'
  };
  icons = {
    ['high']: 'arrowhead-up-outline',
    ['medium']: 'arrow-ios-upward-outline',
    ['low']: 'arrow-ios-downward-outline'
  };
  position = {
    ['backlog']: 'Backlog',
    ['todo']: 'To Do',
    ['inprogress']: 'In Progress',
    ['done']: 'Done'
  };

  backlogSize = 0;
  sprintSize = 0;

  constructor(private fbService: FirebaseService, private windowService: NbWindowService, private dialogService: NbDialogService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(x => {
      this.searchTerm = x.q;
      this.search();
    });
  }

  search() {
    this.fbService.getWorkItems(this.searchTerm).subscribe(x => {
      if (x) {
        this.backlogSize = x.backLogSize;
        this.sprintSize = x.sprintSize;
        this.sprint = x.items.filter(i => i.position !== 'backlog').map(i => new WorkItemSprint(i));
        this.backlog = x.items.filter(i => i.position === 'backlog').map(i => new WorkItemBacklog(i));
      }
    })
  }

  createWorkItem() {
    this.windowService.open(WorkItemCreateComponent, {title: 'Work Item', context: { new: true }});
  }

  deleteWorkItem(id) {
    this.fbService.deleteWorkItem(id);
  }

  updatePosition(item: WorkItemBase) {
    console.log(item);
    // B. polymorphism
    const position: string = item.getType() === 'sprint' ? 'backlog' : 'todo';
    const newWorkItem: WorkItem = {
      id: item.id,
      title: item.title,
      details: item.details,
      priority: item.priority,
      created: item.created,
      createdBy: item.createdBy,
      size: item.size,
      position,
    };

    this.fbService.createWorkItem(({ ...newWorkItem } as WorkItem));
  }

  editWorkItem(workItem: WorkItemBase) {
    const newWorkItem: WorkItem = {
      id: workItem.id,
      title: workItem.title,
      details: workItem.details,
      priority: workItem.priority,
      created: workItem.created,
      createdBy: workItem.createdBy,
      size: workItem.size,
      position: workItem.position,
    };
    this.windowService.open(WorkItemCreateComponent, {title: 'Work Item', context: {workItem: {...newWorkItem}}});
  }

  updateSearch() {
    this.router.navigate(['sprint', 'backlog'], {queryParams: {q: this.searchTerm}});
  }

  getDate(date: firebase.firestore.Timestamp) {
    return moment(date.toDate()).format('MM/DD/yy');
  }

}
