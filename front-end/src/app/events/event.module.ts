import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TitleCasePipe } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';

/*** Components ***/

import { CurrentEventsComponent } from './components/currentEvents/currentEvents.component';
import { EventsAssistanciesComponent } from './components/eventsAssistancies/eventsAssistancies.component';
import { EventsByCategoryComponent } from './components/eventsByCategory/eventsByCategory.component';
import { FavoriteEventsComponent } from './components/favoriteEvents/favoriteEvents.component';
import { EventViewComponent } from './components/viewEvent/viewEvent.component';

/* Main */
import { MainEventsComponent } from './components/mainEvents/mainEvents.component';
import { DpDatePickerModule } from 'ng2-date-picker'; 

/*** Pipe ***/
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        MainEventsComponent,
        CurrentEventsComponent,
        EventsAssistanciesComponent,
        EventsByCategoryComponent,
        FavoriteEventsComponent,
        EventViewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        DpDatePickerModule,
        EventRoutingModule,
        PipesModule
    ],
    exports: [
        //En caso de que se quiera usar los componentes fuera del modulo (pero si no, no es necesario)
        MainEventsComponent,
        CurrentEventsComponent,
        EventsAssistanciesComponent,
        EventsByCategoryComponent,
        FavoriteEventsComponent,
    ],
    providers: [ 
        TitleCasePipe
        /*
        UserService,
        AdminGuard 
        */
    ]
})
export class EventModule { }