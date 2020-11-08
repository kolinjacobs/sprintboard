import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { UiContainerComponent } from './containers/ui-container/ui-container.component';


@NgModule({
  declarations: [UiContainerComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
  ]
})
export class UiModule { }
