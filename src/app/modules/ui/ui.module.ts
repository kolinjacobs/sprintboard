import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { ReportsContainerComponent } from './containers/reports-container/reports-container.component';
import {
  NbActionsModule, NbBadgeModule,
  NbButtonModule,
  NbCardModule, NbDialogModule, NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule, NbSelectModule, NbToastrModule, NbTooltipModule, NbTreeGridModule,
  NbWindowModule
} from '@nebular/theme';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { BacklogContainerComponent } from './containers/backlog-container/backlog-container.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {FormsModule} from "@angular/forms";
import { WorkItemCreateComponent } from './components/work-item-create/work-item-create.component';
import {NbEvaIconsModule} from "@nebular/eva-icons";
import { WorkItemCardComponent } from './components/work-item-card/work-item-card.component';


@NgModule({
  declarations: [ReportsContainerComponent, DashboardContainerComponent, BacklogContainerComponent, WorkItemCreateComponent, WorkItemCardComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
    NbLayoutModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    DragDropModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTooltipModule,
    AngularFireModule,
    AngularFirestoreModule,
    FormsModule,
    NbWindowModule.forChild(),
    NbInputModule,
    NbSelectModule,
    NbTreeGridModule,
    NbBadgeModule,
    NbDialogModule.forChild(),
    NbToastrModule,
  ],
  entryComponents: [BacklogContainerComponent]
})
export class UiModule { }
