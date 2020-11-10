import {WorkItem} from './work-item.model';
import {WorkItemBase} from './work-item-base.class';

export class WorkItemBacklog extends WorkItemBase implements WorkItem  {
  public getType(): string {
    return 'backlog';
  }
}