import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { routing, appRoutingProviders } from './app.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { EditorModule } from '@tinymce/tinymce-angular';
//import { NgxPopper } from 'angular-popper';
import { AppComponent } from './app.component';

/* Modules */
import { AdminModule } from './admin/admin.module';
import { EventModule } from './events/event.module';
import { ExploreModule } from './explore/explore.module';
import { RankingModule } from './ranking/ranking.module';
/* For calendar */
import { DpDatePickerModule } from 'ng2-date-picker';
/* PipeModule */
import { PipesModule } from './pipes/pipes.module';

/* Components */
import { ArtistsComponent } from './components/artists/artists.components';

import { ContactComponent } from './components/contact/contact.component';
//import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegisterComponent } from './components/register/register.component';
import { PwUpdateComponent } from './components/user-profile/pw-update/pw-update.component';
import { EditProfileComponent } from './components/user-profile/edit/edit-profile.component';
import { ViewProfileComponent } from './components/user-profile/view/view-profile.component';

/* Services */

@NgModule({ 
  declarations: [
    AppComponent,
    ArtistsComponent,     
    ContactComponent,
    //EventsComponent, 
    HomeComponent,
    LoginComponent, 
    RankingComponent, 
    RegisterComponent,
    PwUpdateComponent,
    EditProfileComponent,
    ViewProfileComponent
  ],
  exports: [
    PipesModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    EventModule,
    ExploreModule,
    RankingModule,
    DpDatePickerModule,
    PipesModule,
    NgbModule,
    routing 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
