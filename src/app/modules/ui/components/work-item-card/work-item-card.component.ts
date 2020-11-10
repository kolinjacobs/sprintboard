import {Component, Input, OnInit} from '@angular/core';
import {WorkItem} from "../../models/work-item.model";

@Component({
  selector: 'app-work-item-card',
  templateUrl: './work-item-card.component.html',
  styleUrls: ['./work-item-card.component.scss']
})
export class WorkItemCardComponent implements OnInit {

  constructor() { }
  @Input() item: WorkItem;
  color = {
    ['high']: 'danger',
    ['medium']: 'warning',
    ['low']: 'primary'
  };
  ngOnInit(): void {
    console.log(this.item);
  }

}
