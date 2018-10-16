import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TitleCasePipe } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';

/*** Components ***/

import { CurrentEventsComponent } from './components/currentEvents/currentEvents.component';
import { EventsByCategoryComponent } from './components/eventsByCategory/eventsByCategory.component';
import { EventViewComponent } from './components/viewEvent/viewEvent.component';

/* Main */
import { MainExploreComponent } from './components/mainExplore/mainExplore.component';
import { DpDatePickerModule } from 'ng2-date-picker'; 

/*** Pipe ***/
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        MainExploreComponent,
        CurrentEventsComponent,
        EventsByCategoryComponent,
        EventViewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        DpDatePickerModule,
        ExploreRoutingModule,
        PipesModule
    ],
    exports: [
        //En caso de que se quiera usar los componentes fuera del modulo (pero si no, no es necesario)
        MainExploreComponent,
        CurrentEventsComponent,
        EventsByCategoryComponent,
        PipesModule
    ],
    providers: [ 
        TitleCasePipe
        /*
        UserService,
        AdminGuard 
        */
    ]
})
export class ExploreModule { }