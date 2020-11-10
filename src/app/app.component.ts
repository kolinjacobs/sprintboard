import {Component, OnInit} from '@angular/core';
import {NbMenuItem, NbMenuService, NbSearchService} from "@nebular/theme";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  menu: NbMenuItem[] = [
    {
      title: 'dashboard',
      icon: 'list-outline',
      link: '/sprint/dashboard',
      home: true,
    },
    {
      title: 'backlog',
      icon: 'layers-outline',
      link: '/sprint/backlog',
    },
    {
      title: 'reports',
      icon: 'activity-outline',
      link: '/sprint/reports',
    },
  ];
  items = [{ title: 'Log out' }];

  constructor(private firestore: AngularFirestore, private nbMenuService: NbMenuService, public auth: AngularFireAuth, public router: Router, private searchService: NbSearchService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.router.navigate(['sprint', 'backlog'], {queryParams: {q: data.term}});
      });
  }

  ngOnInit() {
    this.nbMenuService.onItemClick().subscribe( x => {
        if (x.item.title === 'Log out') {
          this.auth.signOut().then(x => {
            this.router.navigate(['login']);
          });
        }
      }
    );
  }
}
