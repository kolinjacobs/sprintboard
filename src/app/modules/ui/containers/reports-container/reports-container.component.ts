import { Component, OnInit } from '@angular/core';
import {NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from "@nebular/theme";
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {WorkItem} from '../../models/work-item.model';
import * as moment from 'moment';
import firebase from 'firebase';

interface FSEntry {
  title: string,
  status: string,
  size: string,
  items?: number,
  childEntries?: FSEntry[],
  expanded?: boolean,
}

@Component({
  selector: 'app-reports-container',
  templateUrl: './reports-container.component.html',
  styleUrls: ['./reports-container.component.scss']
})
export class ReportsContainerComponent {
  customColumn = 'title';
  defaultColumns = [ 'status', 'size', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  source: NbTreeGridDataSource<FSEntry>;
  dateSearch;
  dates = {
    ['1d']: '1 day',
    ['1w']: '1 week',
    ['2w']: '2 weeks',
    ['1m']: '1 month',
  };

  constructor(dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private router: Router, private activatedRoute: ActivatedRoute, private fbService: FirebaseService) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      expandedGetter: (node: FSEntry) => !!node.expanded,
    };

    this.activatedRoute.queryParams.subscribe(x => {
      this.dateSearch = x.s;
      this.fbService.searchWorkItemsByDate(x.s).subscribe(items => {
        const data = items.reduce((acc, i: WorkItem) =>
        {
          const date = moment(i.created.toDate()).format('MM/DD/yy');
          const item = {title: i.title, status: i.position, size: i.size, priority: i.priority};
          if (acc.some(a => a.title === date)) {
            acc.find(a => a.title === date).childEntries.push(item);
            acc.find(a => a.title === date).items = acc.find(a => a.title === date).childEntries.length;
          } else {
            acc.push({title: date, status: '', items: '1', size: '', childEntries: [item]});
          }
          return acc;
        }, []).sort((a,b) => {
          return (new Date(b.title) as any) - (new Date(a.title) as any);
        });
        this.source = dataSourceBuilder.create(data, getters);
      });
    });
  }

  updateDate(search) {
    this.router.navigate(['sprint', 'reports'], {queryParams: {s: search}});
  }
}
