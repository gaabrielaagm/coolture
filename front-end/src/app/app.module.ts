import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing, appRoutingProviders } from './app.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
//import { EditorModule } from '@tinymce/tinymce-angular';
//import { NgxPopper } from 'angular-popper';
import { AppComponent } from './app.component';

/* Modules */
import { AdminModule } from './admin/admin.module';

/* Components */
import { ArtistsComponent } from './components/artists/artists.components';

import { ContactComponent } from './components/contact/contact.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePwComponent } from './components/user-profile/change-pw/change-pw.component';
import { EditProfileComponent } from './components/user-profile/edit/edit-profile.component';
import { ViewProfileComponent } from './components/user-profile/view/view-profile.component';


/* Services */

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,     
    ContactComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    RankingComponent,
    RegisterComponent,
    ChangePwComponent,
    EditProfileComponent,
    ViewProfileComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
