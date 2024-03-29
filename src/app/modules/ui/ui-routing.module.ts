import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: fromContainers.DashboardContainerComponent,
  },
  {
    path: 'backlog',
    component: fromContainers.BacklogContainerComponent,
  },
  {
    path: 'reports',
    component: fromContainers.ReportsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiRoutingModule { }
