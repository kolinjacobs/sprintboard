import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {from, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AngularFireAuth, public router: Router, private toastrService: NbToastrService) { }
  email: string;
  password: string;


  ngOnInit(): void {
  }

  login() {
    if (this.email && this.password) {
      from(this.auth.signInWithEmailAndPassword(this.email, this.password)).pipe(
        catchError(x => {
          return of(x);
        })).subscribe((x: any) => {
        if (x.user) {
          this.showToast('welcome back', 'success', '');
          this.router.navigate(['sprint', 'dashboard']);
        } else {
          this.showToast(x.message, 'danger', 'alert-circle-outline');
        }
      })
    } else {
      this.showToast('email and password must both be filled out', 'danger', 'alert-circle-outline');
    }
  }

  showToast(message, status, icon) {
    this.toastrService.show(
      message,
      status === 'success' ? 'success' : 'warning',
      { preventDuplicates: true, status, icon });
  }
}
