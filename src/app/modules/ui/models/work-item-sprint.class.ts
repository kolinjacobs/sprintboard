import {WorkItem} from './work-item.model';
import {WorkItemBase} from './work-item-base.class';

// B. inheritance
export class WorkItemSprint extends WorkItemBase implements WorkItem  {
  public getType(): string {
    return 'sprint';
  }
}