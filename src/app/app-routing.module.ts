import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {LoginComponent} from "./containers/login/login.component";

const redirectLoggedInToItems = () => redirectLoggedInTo(['sprint']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sprint',
    pathMatch: 'full'
  },
  {
    path: 'sprint',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () => import('./modules/ui/ui.module').then(m => m.UiModule)
  },
  {
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems },
    path: 'login',
    component: LoginComponent,
  },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
