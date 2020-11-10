import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbSidebarService,
  NbMenuModule,
  NbMenuService,
  NbUserModule,
  NbContextMenuModule,
  NbListModule,
  NbListItemComponent,
  NbToastrModule, NbDialogModule, NbIconModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { LoginComponent } from './containers/login/login.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbMenuModule.forRoot(),
    NbUserModule,
    NbContextMenuModule,
    NbListModule,
    DragDropModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {},
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
